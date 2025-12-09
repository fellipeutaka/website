"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Menu } from "./ui/menu";
import { Icons } from "./ui/icons";
import { Popover } from "./ui/popover";

export function ModeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <Menu.Root>
      <Button aria-label="Toggle theme" size="icon" variant="ghost">
        <Icons.Sun className="dark:-rotate-90 size-4 rotate-0 scale-100 transition dark:scale-0" />
        <Icons.Moon className="absolute size-4 rotate-90 scale-0 transition dark:rotate-0 dark:scale-100" />
      </Button>

      <Popover.Content className="min-w-32" placement="bottom end">
        <Menu.Content>
          <Menu.Item onAction={() => setTheme("light")}>
            <Icons.Sun className="size-4" />
            Light
          </Menu.Item>
          <Menu.Item onAction={() => setTheme("dark")}>
            <Icons.Moon className="size-4" />
            Dark
          </Menu.Item>
          <Menu.Item onAction={() => setTheme("system")}>
            <Icons.Laptop className="size-4" />
            System
          </Menu.Item>
        </Menu.Content>
      </Popover.Content>
    </Menu.Root>
  );
}
