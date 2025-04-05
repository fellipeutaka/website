import { cva } from "~/lib/cva";

export const FocusRingStyles = cva({
  base: [
    "outline-hidden focus:outline-hidden forced-colors:outline-1",
    "focus-visible:ring-2 focus-visible:ring-ring/20",
    "invalid:ring-2 invalid:ring-danger/20",
  ],
});
