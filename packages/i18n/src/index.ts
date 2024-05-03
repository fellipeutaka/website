import type {
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
} from "next-intl";
import "./globals.d";
import type { Messages } from "./globals.d";
export * from "next-intl";

export type TKey<
  NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never,
> = MessageKeys<
  NestedValueOf<
    {
      "!": Messages;
    },
    [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
  >,
  NestedKeyOf<
    NestedValueOf<
      {
        "!": Messages;
      },
      [NestedKey] extends [never] ? "!" : `!.${NestedKey}`
    >
  >
>;
