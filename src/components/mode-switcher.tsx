"use client";

import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Icons } from "./ui/icons";

export function ModeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        render={
          <Button aria-label="Toggle theme" size="icon" variant="ghost" />
        }
      >
        <Icons.Sun className="size-4 scale-100 rotate-0 transition dark:scale-0 dark:-rotate-90" />
        <Icons.Moon className="absolute size-4 scale-0 rotate-90 transition dark:scale-100 dark:rotate-0" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" className="min-w-32">
        <DropdownMenu.Item
          onClick={() => {
            setTheme("light");
          }}
        >
          <Icons.Sun aria-hidden="true" className="size-4" />
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Icons.Moon aria-hidden="true" className="size-4" />
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => {
            setTheme("system");
          }}
        >
          <Icons.Laptop aria-hidden="true" className="size-4" />
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
