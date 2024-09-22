declare module "tailwindcss/lib/util/flattenColorPalette" {
  declare const flattenColorPalette: (a: unknown) => Record<string, string>;

  export = flattenColorPalette;
}

declare module "tailwindcss-animated" {
  declare const plugin: { handler: () => void };

  export = plugin;
}
