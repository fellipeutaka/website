import { DateFormatter } from "@internationalized/date";

export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
) {
  return new DateFormatter("en-US", options).format(new Date(date));
}

export function formatRange(start: Date, end: Date | null) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  return `${formatDate(start, options)} - ${end ? formatDate(end, options) : "Present"}`;
}
