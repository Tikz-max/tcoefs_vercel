import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth/admin";
import { uploadSiteImage } from "@/lib/r2/images";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB original
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/**
 * Admin-only image upload. Pictures are auto-rotated, limited to 2400px wide
 * and saved as WebP so pages stay fast no matter what size is uploaded.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "Please upload a JPG, PNG, WebP, AVIF or GIF image." },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "That image is larger than 12 MB. Please choose a smaller one." },
        { status: 400 },
      );
    }

    const input = Buffer.from(await file.arrayBuffer());
    const output = await sharp(input)
      .rotate()
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const base = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    const filename = `${Date.now()}-${base || "image"}.webp`;

    const result = await uploadSiteImage(filename, output, "image/webp");
    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? "Upload failed" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true, url: result.url, key: result.key });
  } catch (error: any) {
    console.error("Error in /api/media/upload:", error);
    return NextResponse.json(
      { error: "That file could not be processed as an image." },
      { status: 500 },
    );
  }
}
