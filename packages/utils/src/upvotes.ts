const formatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function formatUpvotes(value: number) {
  return formatter.format(value);
}
