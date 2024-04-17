import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { preset } from "./tailwind.config";
export type { Config } from "tailwindcss";
export { tv } from "tailwind-variants";
export type { VariantProps } from "tailwind-variants";
