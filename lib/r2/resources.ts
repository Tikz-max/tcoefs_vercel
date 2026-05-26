import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  r2Client,
  R2_BUCKET,
  R2_PUBLIC_BASE_URL,
} from "./client";

export const R2_RESOURCES_PREFIX = "tcoefs-resources/tcoefs-pdfs/";

export interface R2Resource {
  key: string;
  filename: string;
  size: number;
  lastModified: Date;
  publicUrl: string;
}

/**
 * Build a public URL for any R2 key, encoding each path segment.
 */
export function getResourcePublicUrl(key: string): string {
  const encodedKey = key
    .split("/")
    .map(encodeURIComponent)
    .join("/");
  return `${R2_PUBLIC_BASE_URL}/${encodedKey}`;
}

/**
 * List all PDFs in the tcoefs-resources/tcoefs-pdfs/ folder.
 */
export async function listR2Resources(): Promise<R2Resource[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET,
      Prefix: R2_RESOURCES_PREFIX,
    });

    const response = await r2Client.send(command);

    if (!response.Contents) return [];

    return response.Contents.filter(
      (obj) =>
        obj.Key &&
        obj.Key !== R2_RESOURCES_PREFIX &&
        obj.Key.toLowerCase().endsWith(".pdf"),
    )
      .map((obj) => ({
        key: obj.Key!,
        filename: obj.Key!.replace(R2_RESOURCES_PREFIX, ""),
        size: obj.Size ?? 0,
        lastModified: obj.LastModified ?? new Date(),
        publicUrl: getResourcePublicUrl(obj.Key!),
      }))
      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
  } catch (error) {
    console.error("Error listing resources from R2:", error);
    return [];
  }
}

/**
 * Upload a resource PDF to R2.
 */
export async function uploadResource(
  filename: string,
  buffer: Buffer,
  contentType = "application/pdf",
): Promise<{
  success: boolean;
  key?: string;
  publicUrl?: string;
  error?: string;
}> {
  const key = `${R2_RESOURCES_PREFIX}${filename}`;

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
      publicUrl: getResourcePublicUrl(key),
    };
  } catch (error: any) {
    console.error("Error uploading resource to R2:", error);
    return { success: false, error: error?.message ?? "Upload failed" };
  }
}

/**
 * Delete a resource PDF from R2 by its full key.
 */
export async function deleteR2Resource(
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
    console.error("Error deleting resource from R2:", error);
    return { success: false, error: error?.message ?? "Delete failed" };
  }
}
