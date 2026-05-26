import { NextRequest, NextResponse } from "next/server";
import { uploadNewsletter } from "@/lib/r2/newsletters";
import { addNewsletter } from "@/lib/services/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const volume = formData.get("volume") as string;
    const issue = formData.get("issue") as string;
    const date = formData.get("date") as string;
    const excerpt = formData.get("excerpt") as string;
    const isLatest = formData.get("is_latest") === "true";
    const updatedBy = formData.get("updated_by") as string | null;

    // Validate required fields
    if (!file || !title || !volume || !issue || !date || !excerpt) {
      return NextResponse.json(
        { error: "Missing required fields: file, title, volume, issue, date, excerpt" },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitise filename — replace spaces with underscores
    const sanitisedFilename = file.name.replace(/\s+/g, "_");

    // Upload to R2
    const uploadResult = await uploadNewsletter(
      sanitisedFilename,
      buffer,
      "application/pdf"
    );

    if (!uploadResult.success || !uploadResult.key) {
      return NextResponse.json(
        { error: uploadResult.error ?? "Upload to R2 failed" },
        { status: 500 }
      );
    }

    // Save metadata to Supabase
    const saveResult = await addNewsletter({
      title,
      volume,
      issue,
      date,
      excerpt,
      r2_key: uploadResult.key,
      is_latest: isLatest,
      updated_by: updatedBy ?? null,
    });

    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error ?? "Failed to save newsletter metadata" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      newsletter: saveResult.data,
      publicUrl: uploadResult.publicUrl,
    });
  } catch (error: any) {
    console.error("Error in /api/newsletters/upload:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
