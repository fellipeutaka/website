import type { Image } from "./zod-image";

/**
 * get public directory
 * @param buffer image buffer
 * @returns image object with blurDataURL
 */
export const getImageMetadata = async (
  buffer: Buffer
): Promise<Omit<Image, "src"> | undefined> => {
  const { default: sharp } = await import("sharp");
  const img = sharp(buffer);
  const { width, height } = await img.metadata();

  const aspectRatio = width / height;
  const blurWidth = 8;
  const blurHeight = Math.max(1, Math.round(blurWidth / aspectRatio));
  const blurImage = await img
    .resize(blurWidth, blurHeight)
    .webp({ quality: 1 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurImage.toString("base64")}`;
  return { height, width, blurDataURL, blurWidth, blurHeight };
};
