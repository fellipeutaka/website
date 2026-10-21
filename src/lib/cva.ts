import { cx } from "cva";
import { defineConfig } from "cva/config";
import { twMerge } from "tailwind-merge";

export const { cva, cx: cn } = defineConfig({
  cx: (...inputs: Parameters<typeof cx>) => twMerge(cx(...inputs)),
});

export type { VariantProps } from "cva";
export { cx } from "cva";
