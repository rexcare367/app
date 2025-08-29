import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/database";
import { WebhookResponse } from "@/types/database";

export async function POST(
  request: NextRequest
): Promise<NextResponse<WebhookResponse>> {
  try {
    // Parse the request payload
    const payload = await request.json();

    // Validate that we have some data
    if (!payload || Object.keys(payload).length === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "No payload provided",
          error: "No payload provided",
        },
        { status: 400 }
      );
    }

    // Insert the payload into the users table
    const { data, error } = await createUser({ name: "test" });

    if (error) {
      console.error("Supabase error:", error);
      // Still return 200 for webhook compatibility, but log the error
      return NextResponse.json(
        {
          status: "webhook_received",
          message: "Webhook processed but database insertion failed",
          error: error.message,
        },
        { status: 200 }
      );
    }

    // Return 200 for webhook compatibility
    return NextResponse.json(
      {
        status: "success",
        message: "Webhook processed successfully",
        data: data || undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Return 200 even on error for webhook compatibility
    return NextResponse.json(
      {
        status: "webhook_received",
        message: "Webhook received but processing failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }
    );
  }
}
