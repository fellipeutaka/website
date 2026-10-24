import { createOpenGraphImage } from "~/components/open-graph-image";
import { siteConfig } from "~/config/site";

export const alt = `${siteConfig.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOpenGraphImage({
    title: "Full-Stack Developer",
    description:
      "Obsessed with developer experience, robust, scalable and user-friendly applications.",
  });
}
