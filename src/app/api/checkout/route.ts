import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Lazy init — avoids crash at build time when env vars aren't available
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const body = await req.json();
    const { name, zodiacSign, lifePath, gematriaValue } = body;

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Full Cosmic Reading",
              description: `Complete Numerology, Gematria & Cosmic Correlation reading for ${name}`,
            },
            unit_amount: 444, // $4.44 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Pass reading data in the success URL so we can generate after payment
      success_url: `${BASE_URL}/reading/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name)}&sign=${encodeURIComponent(zodiacSign)}&lifePath=${lifePath}&gematria=${gematriaValue}`,
      cancel_url: `${BASE_URL}/?cancelled=true`,
      metadata: {
        name,
        zodiacSign,
        lifePath: String(lifePath),
        gematriaValue: String(gematriaValue),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
