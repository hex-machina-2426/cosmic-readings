import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Lazy init — avoids crash at build time when env vars aren't available
function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export async function POST(req: NextRequest) {
  const anthropic = getAnthropic();

  try {
    const body = await req.json();
    const { name, zodiacSign, lifePath, gematriaValue, birthTime, birthLocation } = body;

    // Validate required fields
    if (!name || !zodiacSign || !lifePath) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const locationContext = birthLocation ? `, born in ${birthLocation}` : "";
    const timeContext = birthTime ? ` at ${birthTime}` : "";

    // Generate the FULL reading upfront — we'll only show teasers on the free tier
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `You are a mystical cosmic advisor. Create a comprehensive personalized reading for ${name}, a ${zodiacSign.name} (${zodiacSign.symbol}, ${zodiacSign.element} element) with Life Path Number ${lifePath} and name Gematria value ${gematriaValue}${locationContext}${timeContext}.

For EACH section, provide both a tantalizing teaser (2-3 sentences that hook them and make them desperate to read more) AND the full deep reading.

The teasers should be crafted to trigger curiosity — hint at something specific and surprising, make them NEED to know more. Each teaser should hook differently: one emotional, one mysterious, one revelatory.

Sections:
1. ZODIAC READING: Their ${zodiacSign.name} cosmic profile. Full reading: 5-6 sentences, mystical but insightful.
2. NUMEROLOGY READING: Life Path ${lifePath} analysis. Full reading: 6-8 sentences covering personality, purpose, challenges.
3. GEMATRIA READING: Name "${name}" with value ${gematriaValue}. Full reading: 5-7 sentences on spiritual significance.
4. COSMIC CORRELATION: How all three systems interweave uniquely for this person. Full reading: 5-6 sentences synthesizing everything.

Be cosmic, poetic, and genuinely insightful. Make the full readings feel worth paying for — deep, personal, specific.

Respond as JSON only:
{
  "zodiac": { "teaser": "...", "full": "..." },
  "numerology": { "teaser": "...", "full": "..." },
  "gematria": { "teaser": "...", "full": "..." },
  "cosmicCorrelation": { "teaser": "...", "full": "..." }
}`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text in response");
    }

    const cleaned = textBlock.text.replace(/```json\s?|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Return teasers for all sections — full readings stay server-side
    // We'll regenerate (or use stored) full readings after payment verification
    return NextResponse.json({
      teasers: {
        zodiac: parsed.zodiac.teaser,
        numerology: parsed.numerology.teaser,
        gematria: parsed.gematria.teaser,
        cosmicCorrelation: parsed.cosmicCorrelation.teaser,
      },
      // Include the zodiac full reading as the free hook
      zodiacFull: parsed.zodiac.full,
    });
  } catch (error) {
    console.error("Reading generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate reading. Please try again." },
      { status: 500 }
    );
  }
}
