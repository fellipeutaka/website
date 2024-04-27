declare module "tailwindcss/lib/util/flattenColorPalette" {
  declare const flattenColorPalette: (a: unknown) => Record<string, string>;

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  export = flattenColorPalette;
}

declare module "tailwindcss-animated" {
  declare const plugin: { handler: () => void };

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  export = plugin;
}
