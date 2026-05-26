import { NextRequest, NextResponse } from "next/server";
import { deleteR2Resource } from "@/lib/r2/resources";
import { deleteResourceEntry } from "@/lib/services/admin";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest) {
  try {
    const { id, r2_key } = await request.json();

    if (!id || !r2_key) {
      return NextResponse.json(
        { error: "Missing required fields: id, r2_key" },
        { status: 400 },
      );
    }

    // Delete from R2 first
    const r2Result = await deleteR2Resource(r2_key);
    if (!r2Result.success) {
      console.warn("R2 delete failed but continuing:", r2Result.error);
    }

    // Delete metadata from Supabase
    const dbResult = await deleteResourceEntry(id);
    if (!dbResult.success) {
      return NextResponse.json(
        { error: dbResult.error ?? "Failed to delete resource from database" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in /api/resources/delete:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}
