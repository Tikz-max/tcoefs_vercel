import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET, R2_PUBLIC_BASE_URL } from "./client";

export const R2_IMAGE_PREFIX = "tcoefs-resources/site-images/";

/** Upload an already-processed image and return its public URL. */
export async function uploadSiteImage(
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<{ success: boolean; key?: string; url?: string; error?: string }> {
  if (!R2_PUBLIC_BASE_URL) {
    return {
      success: false,
      error:
        "Image storage is not configured (NEXT_PUBLIC_R2_PUBLIC_BASE_URL is missing).",
    };
  }
  const key = `${R2_IMAGE_PREFIX}${filename}`;
  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    return { success: true, key, url: `${R2_PUBLIC_BASE_URL}/${key}` };
  } catch (error: any) {
    console.error("Error uploading image to R2:", error);
    return { success: false, error: error?.message ?? "Upload failed" };
  }
}
