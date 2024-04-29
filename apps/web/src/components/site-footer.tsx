import { ButtonStyles } from "@utaka/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@utaka/ui/tooltip";
import { socialLinks } from "~/config/site";

export function SiteFooter() {
  return (
    <footer className="my-12 flex flex-wrap items-center justify-center gap-4">
      <TooltipProvider delayDuration={300}>
        {socialLinks.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <a
                className={ButtonStyles({ size: "icon", variant: "outline" })}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={link.label}
              >
                <link.icon />
              </a>
            </TooltipTrigger>
            <TooltipContent>{link.label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </footer>
  );
}
