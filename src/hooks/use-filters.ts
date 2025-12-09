import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { technologies } from "~/lib/technologies";

export function useFilters() {
  return useQueryStates(
    {
      q: parseAsString.withDefault(""),
      techs: parseAsArrayOf(
        parseAsStringEnum(technologies.map((t) => t.name))
      ).withDefault([]),
    },
    {
      clearOnDefault: true,
    }
  );
}
