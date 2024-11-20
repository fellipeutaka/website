import { env } from "~/config/env";
import { siteConfig } from "~/config/site";
import { api } from "~/lib/fetch";

export async function getGithubLastEdit(path: string) {
  try {
    const { data, error } = await api(
      "https://api.github.com/repos/:owner/:repo/commits",
      {
        params: {
          owner: "fellipeutaka",
          repo: siteConfig.repositoryName,
        },
        query: {
          path,
        },
        auth: {
          type: "Custom",
          prefix: "",
          value: env.GITHUB_TOKEN,
        },
        next: {
          revalidate: 3600, // 1 hour
        },
      },
    );

    if (error) {
      return null;
    }

    if (data.length === 0) return null;
    return new Date(data[0].commit.committer.date);
  } catch {
    return null;
  }
}
