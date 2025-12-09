import { siteConfig } from "~/config/site";
import { formatDate } from "~/utils/date";
import { Icons } from "../ui/icons";

const editURL = (filePath: string) =>
  `${siteConfig.links.github}/${siteConfig.repositoryName}/blob/main/${filePath}?plain=1`;

interface PostFooterProps {
  lastModified: Date | undefined;
  filePath: string;
}

export async function PostFooter({ filePath, lastModified }: PostFooterProps) {
  return (
    <div className="my-8 flex w-full items-center justify-between py-4 text-sm">
      <div className="text-muted-foreground">
        Last updated:{" "}
        {lastModified
          ? formatDate(lastModified, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "--"}
      </div>

      <a
        className="flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
        href={editURL(filePath)}
      >
        Edit on GitHub <Icons.ExternalLink className="size-3" />
      </a>
    </div>
  );
}
