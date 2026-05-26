import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID?.trim();

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID?.trim() ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY?.trim() ?? "",
  },
});

export const R2_BUCKET = "tcoefs-main";
export const R2_NEWSLETTER_PREFIX = "tcoefs-resources/newsletters/";
// NEXT_PUBLIC_ prefix makes this available in the browser bundle (client components)
export const R2_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.trim() ??
  process.env.R2_PUBLIC_BASE_URL?.trim() ??
  "";
