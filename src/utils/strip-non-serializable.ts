// biome-ignore lint/suspicious/noExplicitAny: This is a utility type, so we allow any
type SAFE_ANY = any;

type SAFE_FUNCTION = (...args: SAFE_ANY[]) => SAFE_ANY;

// biome-ignore lint/complexity/noBannedTypes: We need to define a safe symbol type
type SAFE_SYMBOL = Symbol;

export type StripNonSerializable<T> = T extends
  | SAFE_FUNCTION
  | Date
  | Map<SAFE_ANY, SAFE_ANY>
  | Set<SAFE_ANY>
  | SAFE_SYMBOL
  ? never
  : T extends Array<infer U>
    ? StripNonSerializable<U>[]
    : T extends object
      ? {
          [K in keyof T as T[K] extends
            | SAFE_FUNCTION
            | Date
            | Map<SAFE_ANY, SAFE_ANY>
            | Set<SAFE_ANY>
            | SAFE_SYMBOL
            ? never
            : K]: StripNonSerializable<T[K]>;
        }
      : T;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This function is complex due to the nature of serializable checks
export function stripNonSerializable<T>(obj: T): StripNonSerializable<T> {
  if (Array.isArray(obj)) {
    return obj
      .map(stripNonSerializable)
      .filter((v) => v !== undefined) as StripNonSerializable<T>;
  }

  if (
    obj !== null &&
    typeof obj === "object" &&
    !(obj instanceof Date) &&
    !(obj instanceof Map) &&
    !(obj instanceof Set)
  ) {
    const result: SAFE_ANY = {};
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = (obj as SAFE_ANY)[key];
        if (
          typeof value === "function" ||
          value instanceof Date ||
          value instanceof Map ||
          value instanceof Set ||
          typeof value === "symbol"
        ) {
          continue;
        }

        const cleanedValue = stripNonSerializable(value);

        try {
          // Ensure it's serializable (like structuredClone behavior)
          structuredClone(cleanedValue);
          result[key] = cleanedValue;
        } catch {
          // If it's not serializable, skip it
        }
      }
    }
    return result;
  }

  // Allow only serializable primitives
  try {
    structuredClone(obj);
    return obj as StripNonSerializable<T>;
  } catch {
    return undefined as unknown as StripNonSerializable<T>;
  }
}
