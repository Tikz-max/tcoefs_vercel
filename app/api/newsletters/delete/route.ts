import { NextRequest, NextResponse } from "next/server";
import { deleteNewsletter } from "@/lib/r2/newsletters";
import { deleteNewsletterEntry } from "@/lib/services/admin";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest) {
  try {
    const { id, r2_key } = await request.json();

    if (!id || !r2_key) {
      return NextResponse.json(
        { error: "Missing required fields: id, r2_key" },
        { status: 400 }
      );
    }

    // Delete from R2 first
    const r2Result = await deleteNewsletter(r2_key);

    if (!r2Result.success) {
      console.warn("R2 delete failed but continuing with Supabase delete:", r2Result.error);
    }

    // Delete metadata from Supabase
    const dbResult = await deleteNewsletterEntry(id);

    if (!dbResult.success) {
      return NextResponse.json(
        { error: dbResult.error ?? "Failed to delete newsletter from database" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/newsletters/delete:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
