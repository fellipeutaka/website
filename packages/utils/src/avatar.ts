export function getUserInitials(name?: string | null) {
  if (!name) return "";

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return initials;
}
