import { NextRequest, NextResponse } from "next/server";
import { uploadResource } from "@/lib/r2/resources";
import { addResource } from "@/lib/services/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const year = formData.get("year") as string;
    const isFeatured = formData.get("is_featured") === "true";
    const updatedBy = formData.get("updated_by") as string | null;

    if (!file || !title || !category || !description || !year) {
      return NextResponse.json(
        { error: "Missing required fields: file, title, category, description, year" },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sanitisedFilename = file.name.replace(/\s+/g, "_");

    const uploadResult = await uploadResource(sanitisedFilename, buffer, "application/pdf");

    if (!uploadResult.success || !uploadResult.key) {
      return NextResponse.json(
        { error: uploadResult.error ?? "Upload to R2 failed" },
        { status: 500 }
      );
    }

    const saveResult = await addResource({
      title,
      category,
      description,
      r2_key: uploadResult.key,
      year,
      is_featured: isFeatured,
      updated_by: updatedBy ?? null,
    });

    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error ?? "Failed to save resource metadata" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      resource: saveResult.data,
      publicUrl: uploadResult.publicUrl,
    });
  } catch (error: any) {
    console.error("Error in /api/resources/upload:", error);
    return NextResponse.json(
      { error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
