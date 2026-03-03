import { NextResponse } from "next/server";
import { listNewsletters } from "@/lib/r2/newsletters";

export const runtime = "nodejs";

export async function GET() {
  try {
    const newsletters = await listNewsletters();
    return NextResponse.json({ newsletters });
  } catch (error: any) {
    console.error("Error in /api/newsletters:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletters" },
      { status: 500 }
    );
  }
}
