import { siteConfig } from "~/config/site";
import { getGithubLastEdit } from "~/http/get-github-last-edit";
import { formatDate } from "~/utils/date";
import { Icons } from "../ui/icons";

const editURL = (filePath: string) =>
  `${siteConfig.links.github}/${siteConfig.repositoryName}/blob/main/${filePath}?plain=1`;

interface PostFooterProps {
  filePath: string;
}

export async function PostFooter({ filePath }: PostFooterProps) {
  const modifiedAt = await getGithubLastEdit(filePath);

  return (
    <div className="my-8 flex w-full items-center justify-between py-4 text-sm">
      <div className="text-muted-fg">
        Last updated: {modifiedAt ? formatDate(modifiedAt) : "--"}
      </div>

      <a
        className="flex items-center gap-2 text-muted-fg transition hover:text-fg"
        href={editURL(filePath)}
      >
        Edit on GitHub <Icons.ExternalLink className="size-3" />
      </a>
    </div>
  );
}
