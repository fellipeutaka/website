import fs from "node:fs/promises";
import path from "node:path";
import type { RefinementCtx } from "zod";
import { getHashedFilename } from "./get-hashed-filename";
import { getImageMetadata } from "./get-image-metadata";

/**
 * Image object with metadata & blur image
 */
export interface Image {
  /**
   * public url of the image
   */
  src: string;
  /**
   * image width
   */
  width: number;
  /**
   * image height
   */
  height: number;
  /**
   * blurDataURL of the image
   */
  blurDataURL: string;
  /**
   * blur image width
   */
  blurWidth: number;
  /**
   * blur image height
   */
  blurHeight: number;
}

export function zodImage(options: {
  path: string;
}): (value: string, ctx: RefinementCtx) => Promise<Image> {
  return async (value: string, ctx: RefinementCtx) => {
    try {
      const postDir = path.dirname(options.path);
      const imagePath = path.resolve(postDir, value);
      const buffer = await fs.readFile(imagePath);

      const metadata = await getImageMetadata(buffer);

      if (!metadata) {
        throw new Error(`Failed to get image metadata: ${value}`);
      }

      const hashedName = getHashedFilename(buffer, value);

      const outputPath = path.join(process.cwd(), ".next/static/media");
      await fs.mkdir(outputPath, { recursive: true });
      await fs.writeFile(path.join(outputPath, hashedName), buffer);

      return { src: `/_next/static/media/${hashedName}`, ...metadata };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      ctx.addIssue({ fatal: true, code: "custom", message });
      return null as never;
    }
  };
}
