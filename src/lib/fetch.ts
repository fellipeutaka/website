import { createFetch, createSchema } from "@better-fetch/fetch";
import { z } from "zod";

const schema = createSchema(
  {
    "https://wakatime.com/api/v1/users/current/all_time_since_today": {
      output: z.object({
        data: z.object({
          total_seconds: z.number(),
          text: z.string(),
          decimal: z.string(),
          digital: z.string(),
          daily_average: z.number(),
          is_up_to_date: z.boolean(),
          percent_calculated: z.number(),
          range: z.object({
            start: z.string(),
            start_date: z.string(),
            start_text: z.string(),
            end: z.string(),
            end_date: z.string(),
            end_text: z.string(),
            timezone: z.string(),
          }),
          timeout: z.number(),
        }),
      }),
    },
    "https://api.github.com/repos/:owner/:repo/commits": {
      params: z.object({
        owner: z.string(),
        repo: z.string(),
      }),
      query: z.object({
        path: z.string(),
      }),
      output: z.array(
        z.object({
          commit: z.object({
            committer: z.object({
              date: z.string(),
            }),
          }),
        })
      ),
    },
  },
  {
    strict: true,
  }
);

export const api = createFetch({
  schema,
});
