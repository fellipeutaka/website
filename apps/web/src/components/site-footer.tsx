"use client";

import { ButtonStyles, Tooltip } from "@utaka/ui";
import { socialLinks } from "~/config/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto my-12 space-x-4">
      <Tooltip.Provider delayDuration={300}>
        {socialLinks.map((link) => (
          <Tooltip key={link.href}>
            <Tooltip.Trigger asChild>
              <a
                className={ButtonStyles({ size: "icon", variant: "outline" })}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={link.label}
              >
                <link.icon />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content>{link.label}</Tooltip.Content>
          </Tooltip>
        ))}
      </Tooltip.Provider>
    </footer>
  );
}
