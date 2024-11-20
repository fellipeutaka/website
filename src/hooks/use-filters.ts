import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { technologyList } from "~/lib/technologies";

export function useFilters() {
  return useQueryStates(
    {
      q: parseAsString.withDefault(""),
      techs: parseAsArrayOf(parseAsStringEnum(technologyList)).withDefault([]),
    },
    {
      clearOnDefault: true,
    },
  );
}
