import { env } from "@utaka/env";
import { getGithubLastEdit } from "@utaka/mdx/utils/git-api";
import { Icons } from "@utaka/ui/icons";
import { formatDate } from "@utaka/utils/date";
import { siteConfig } from "~/config/site";

const editURL = (filePath: string) =>
  `${siteConfig.links.github}/${siteConfig.repositoryName}/blob/main/${filePath}?plain=1`;

interface PostFooterProps {
  filePath: string;
}

export async function PostFooter({ filePath }: PostFooterProps) {
  const modifiedAt = await getGithubLastEdit({
    owner: "fellipeutaka",
    path: filePath,
    repo: siteConfig.repositoryName,
    token: env.GITHUB_TOKEN,
    options: {
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  });

  return (
    <div className="my-8 flex w-full items-center justify-between py-4 text-sm">
      <div className="text-muted-foreground">
        Last updated: {modifiedAt ? formatDate(modifiedAt) : "--"}
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
