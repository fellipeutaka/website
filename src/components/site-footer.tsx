import { socialLinks } from "~/config/site";
import { LinkButton } from "./ui/button";
import { TooltipArrow, TooltipContent, TooltipRoot } from "./ui/tooltip";

export function SiteFooter() {
  return (
    <footer className="my-12 flex flex-wrap items-center justify-center gap-4">
      {socialLinks.map((link) => (
        <TooltipRoot key={link.href} delay={300}>
          <LinkButton
            size="icon"
            variant="outline"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={link.label}
          >
            <link.icon className="size-5" />
          </LinkButton>
          <TooltipContent>
            <TooltipArrow />
            {link.label}
          </TooltipContent>
        </TooltipRoot>
      ))}
    </footer>
  );
}
