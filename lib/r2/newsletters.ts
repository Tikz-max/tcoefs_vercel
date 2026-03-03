import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  r2Client,
  R2_BUCKET,
  R2_NEWSLETTER_PREFIX,
  R2_PUBLIC_BASE_URL,
} from "./client";

export interface R2Newsletter {
  key: string;
  filename: string;
  size: number;
  lastModified: Date;
  publicUrl: string;
}

/**
 * List all newsletter PDFs in the tcoefs-resources/newsletters/ folder
 */
export async function listNewsletters(): Promise<R2Newsletter[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET,
      Prefix: R2_NEWSLETTER_PREFIX,
    });

    const response = await r2Client.send(command);

    if (!response.Contents) return [];

    return response.Contents.filter(
      (obj) => obj.Key && obj.Key !== R2_NEWSLETTER_PREFIX,
    ) // exclude folder itself
      .filter((obj) => obj.Key?.toLowerCase().endsWith(".pdf"))
      .map((obj) => ({
        key: obj.Key!,
        filename: obj.Key!.replace(R2_NEWSLETTER_PREFIX, ""),
        size: obj.Size ?? 0,
        lastModified: obj.LastModified ?? new Date(),
        publicUrl: `${R2_PUBLIC_BASE_URL}/${obj.Key}`,
      }))
      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
  } catch (error) {
    console.error("Error listing newsletters from R2:", error);
    return [];
  }
}

/**
 * Upload a newsletter PDF to R2
 * @param filename - the desired filename (e.g. "TCoEFS_Newsletter_Vol1_Issue3-4.pdf")
 * @param buffer - the file buffer
 * @param contentType - should be "application/pdf"
 */
export async function uploadNewsletter(
  filename: string,
  buffer: Buffer,
  contentType = "application/pdf",
): Promise<{
  success: boolean;
  key?: string;
  publicUrl?: string;
  error?: string;
}> {
  const key = `${R2_NEWSLETTER_PREFIX}${filename}`;

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ContentDisposition: `attachment; filename="${filename}"`,
    });

    await r2Client.send(command);

    return {
      success: true,
      key,
      publicUrl: `${R2_PUBLIC_BASE_URL}/${key}`,
    };
  } catch (error: any) {
    console.error("Error uploading newsletter to R2:", error);
    return { success: false, error: error?.message ?? "Upload failed" };
  }
}

/**
 * Delete a newsletter PDF from R2 by its full key
 */
export async function deleteNewsletter(
  key: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    });

    await r2Client.send(command);
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting newsletter from R2:", error);
    return { success: false, error: error?.message ?? "Delete failed" };
  }
}

/**
 * Build the public download URL for a given R2 key
 */
export function getPublicUrl(key: string): string {
  // Encode each path segment separately so slashes are preserved but spaces/special chars are encoded
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `${R2_PUBLIC_BASE_URL}/${encodedKey}`;
}
