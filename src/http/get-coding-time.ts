import { env } from "~/config/env";
import { api } from "~/lib/fetch";

export async function getCodingTime() {
  try {
    const { data, error } = await api(
      "https://wakatime.com/api/v1/users/current/all_time_since_today",
      {
        auth: {
          type: "Custom",
          prefix: "Basic",
          value: env.WAKATIME_API_KEY,
        },
        next: {
          revalidate: 3600, // 1 hour
        },
      },
    );

    if (error) {
      return null;
    }

    return {
      seconds: data.data.total_seconds,
    };
  } catch {
    return null;
  }
}
