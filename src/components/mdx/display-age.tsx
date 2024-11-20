import { getLocalTimeZone, today } from "@internationalized/date";

export function DisplayAge() {
  const diff = today(getLocalTimeZone()).subtract({
    years: 2005,
  });

  return diff.year;
}
