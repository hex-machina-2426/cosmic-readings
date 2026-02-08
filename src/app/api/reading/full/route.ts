import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import Stripe from "stripe";

// Lazy init — avoids crash at build time when env vars aren't available
function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  const anthropic = getAnthropic();
  const stripe = getStripe();
  try {
    const body = await req.json();
    const { sessionId, name, zodiacSign, lifePath, gematriaValue } = body;

    // Verify payment was completed via Stripe session
    if (!sessionId) {
      return NextResponse.json(
        { error: "Payment required" },
        { status: 402 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    // Generate the full reading
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `You are a mystical cosmic advisor. Create a comprehensive paid reading for ${name}, a ${zodiacSign.name} (${zodiacSign.symbol}, ${zodiacSign.element} element) with Life Path Number ${lifePath} and name Gematria value of ${gematriaValue}.

Provide three detailed readings:

1. NUMEROLOGY READING: Deep analysis of Life Path ${lifePath}. Cover personality traits, life purpose, challenges, and opportunities. (6-8 sentences)

2. GEMATRIA READING: Analyze the name "${name}" with Gematria value ${gematriaValue}. Explore the spiritual significance of this number and what it reveals about their soul's encoding. (5-7 sentences)

3. COSMIC CORRELATION: Synthesize all three systems — how their ${zodiacSign.name} energy, Life Path ${lifePath}, and Gematria ${gematriaValue} work together. What unique pattern emerges? (4-6 sentences)

Be mystical, poetic, and genuinely insightful. Make it feel worth paying for.

Respond as JSON only:
{
  "numerology": "...",
  "gematria": "...",
  "cosmicCorrelation": "..."
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

    return NextResponse.json({
      numerology: parsed.numerology,
      gematria: parsed.gematria,
      cosmicCorrelation: parsed.cosmicCorrelation,
    });
  } catch (error) {
    console.error("Full reading error:", error);
    return NextResponse.json(
      { error: "Failed to generate full reading." },
      { status: 500 }
    );
  }
}
