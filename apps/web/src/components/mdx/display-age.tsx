import { calculateAge } from "@utaka/utils/date";

export function DisplayAge() {
  return calculateAge(new Date("2005-01-16"));
}
