import { env } from "@utaka/env";
import { useTranslations } from "@utaka/i18n";
import { getTranslations } from "@utaka/i18n/server";
import { Icons } from "@utaka/ui/icons";
import { Suspense } from "react";

export function CodingHours() {
  const t = useTranslations("components.home.coding-hours");

  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4 pb-10 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Clock className="size-4" />
        <h2 className="font-light text-sm">{t("title")}</h2>
      </div>
      <p className="flex grow items-center justify-center font-semibold font-title text-4xl">
        <Suspense fallback={"--"}>
          <CodingHoursValue />
        </Suspense>
      </p>
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
  const [data, t] = await Promise.all([
    getData(),
    getTranslations("components.home.coding-hours"),
  ]);

  if (data === null) {
    return "--";
  }

  return t("hours", { value: Math.round(data.seconds / 60 / 60) });
}
