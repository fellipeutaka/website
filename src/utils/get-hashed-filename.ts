import { createHash } from "node:crypto";
import path from "node:path";

export function getHashedFilename(buffer: Buffer, originalName: string) {
  const hash = createHash("md5").update(buffer).digest("hex").slice(0, 8);
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  return `${name}.${hash}${ext}`;
}
