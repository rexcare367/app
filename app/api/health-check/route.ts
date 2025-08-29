import { NextResponse } from "next/server";
import { HealthCheckResponse } from "@/types/database";

export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  const response: HealthCheckResponse = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    message: "Service is running normally",
  };

  return NextResponse.json(response, { status: 200 });
}
