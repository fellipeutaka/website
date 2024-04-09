declare module "tailwindcss/lib/util/flattenColorPalette" {
  declare const flattenColorPalette: (a: unknown) => Record<string, string>;

  export = flattenColorPalette;
}
