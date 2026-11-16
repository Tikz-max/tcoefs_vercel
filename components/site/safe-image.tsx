import Image, { type ImageProps } from "next/image";
import { canOptimise } from "@/lib/images";

/** next/image that never throws for an image host we have not configured. */
export function SafeImage({ src, ...props }: ImageProps) {
  const url = typeof src === "string" ? src : "";
  return (
    <Image
      src={src}
      unoptimized={url ? !canOptimise(url) : false}
      {...props}
    />
  );
}
