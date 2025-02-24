import Ably from "ably";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.ABLY_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: "Ably API key not found" }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: 'user-123',
      capability: {
        "*": ["publish", "subscribe", "presence"]
      }
    });

    return NextResponse.json(tokenRequestData, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error generating Ably token:', error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate token" }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
} 