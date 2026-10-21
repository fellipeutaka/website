import { Suspense } from "react";

import { Icons } from "~/components/ui/icons";
import { getCodingTime } from "~/http/get-coding-time";

export function CodingHours() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4 pb-10 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Clock className="size-4" />
        <h2 className="text-sm font-light">Coding hours</h2>
      </div>
      <p className="font-title flex grow items-center justify-center text-4xl font-semibold">
        <Suspense fallback="-- hrs">
          <CodingHoursValue />
        </Suspense>
      </p>
    </div>
  );
}

async function CodingHoursValue() {
  const data = await getCodingTime();

  if (data === null) {
    return "--";
  }

  return `${Math.round(data.seconds / 60 / 60)} hrs`;
}
