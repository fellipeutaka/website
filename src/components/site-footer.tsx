import { socialLinks } from "~/config/site";
import { LinkButton } from "./ui/link-button";
import { TooltipArrow, TooltipContent, TooltipRoot } from "./ui/tooltip";

export function SiteFooter() {
  return (
    <footer className="my-12 flex flex-wrap items-center justify-center gap-4">
      {socialLinks.map((link) => (
        <TooltipRoot delay={300} key={link.href}>
          <LinkButton
            aria-label={link.label}
            href={link.href}
            rel="noopener noreferrer"
            size="icon"
            target="_blank"
            variant="outline"
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
