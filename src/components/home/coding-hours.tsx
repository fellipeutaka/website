import { Suspense } from "react";
import { env } from "~/lib/env";
import { Icons } from "../ui/icons";

export function CodingHours() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Clock className="size-4" />
        <h2 className="font-light text-sm">Coding hours</h2>
      </div>
      <div className="flex grow items-center justify-center font-semibold font-title text-4xl">
        <Suspense fallback={"-- hrs"}>
          <CodingHoursValue />
        </Suspense>
      </div>
    </div>
  );
}

async function getData() {
  try {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/current/all_time_since_today",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString(
            "base64",
          )}`,
        },
        next: {
          revalidate: 3600, // 1 hour
        },
      },
    );
    if (!res.ok) {
      return null;
    }
    const {
      data: { total_seconds },
    } = await res.json();
    return {
      seconds: total_seconds as number,
    };
  } catch {
    return null;
  }
}

async function CodingHoursValue() {
  const data = await getData();

  if (data === null) {
    return "--";
  }

  return `${Math.round(data.seconds / 60 / 60)} hrs`;
}
