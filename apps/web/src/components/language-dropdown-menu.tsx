"use client";

import type { Locale } from "@utaka/i18n/shared";
import { useChangeLocale } from "@utaka/i18n/utils/react";
import { Button } from "@utaka/ui/button";
import { DropdownMenu } from "@utaka/ui/dropdown-menu";
import { type IconComponent, Icons } from "@utaka/ui/icons";

const languages = [
  {
    locale: "en",
    name: "English",
    icon: Icons.UnitedStates,
  },
  {
    locale: "pt-BR",
    name: "Português",
    icon: Icons.Brazil,
  },
  // {
  //   locale: "es",
  //   name: "Español",
  //   icon: Icons.Spanish,
  // },
  // {
  //   locale: "fr",
  //   name: "Français",
  //   icon: Icons.French,
  // },
  // {
  //   locale: "it",
  //   name: "Italiano",
  //   icon: Icons.Italy,
  // },
  // {
  //   locale: "de",
  //   name: "Deutsch",
  //   icon: Icons.Germany,
  // },
  // {
  //   locale: "ru",
  //   name: "Русский",
  //   icon: Icons.Russia,
  // },
  // {
  //   locale: "tr",
  //   name: "Türkçe",
  //   icon: Icons.Turkey,
  // },
  // {
  //   locale: "jp",
  //   name: "日本語",
  //   icon: Icons.Japan,
  // },
  // {
  //   locale: "zh-CN",
  //   name: "简体中文",
  //   icon: Icons.China,
  // }
] as const satisfies {
  locale: Locale;
  name: string;
  icon: IconComponent;
}[];

export function LanguageDropdownMenu() {
  const changeLocale = useChangeLocale();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.Languages className="size-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {languages.map((language) => (
          <DropdownMenu.Item
            key={language.locale}
            onSelect={() => changeLocale(language.locale)}
          >
            <language.icon className="mr-2 size-4" />
            {language.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
