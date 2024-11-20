import { DateFormatter } from "@internationalized/date";

export function formatDate(date: string | Date) {
  return new DateFormatter("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
