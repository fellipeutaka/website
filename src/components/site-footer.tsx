import { siteConfig } from "~/config/site";

import { ButtonStyles } from "./ui/button";
import { Icons } from "./ui/icons";
import { Tooltip } from "./ui/tooltip";

const links = [
  {
    label: "GitHub",
    icon: Icons.GitHub,
    href: siteConfig.links.github,
  },
  {
    label: "Twitter",
    icon: Icons.Twitter,
    href: siteConfig.links.twitter,
  },
  {
    label: "Dev.to",
    icon: Icons.Layers,
    href: siteConfig.links.devTo,
  },
  {
    label: "LinkedIn",
    icon: Icons.LinkedIn,
    href: siteConfig.links.linkedin,
  },
  {
    label: "Codepen",
    icon: Icons.Codepen,
    href: siteConfig.links.codepen,
  },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto my-12 space-x-4">
      <Tooltip.Provider delayDuration={300}>
        {links.map((link) => (
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
