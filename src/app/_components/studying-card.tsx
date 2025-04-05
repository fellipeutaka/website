import { Icons } from "~/components/ui/icons";
import { LinkPrimitive } from "~/components/ui/link";
import {
  TooltipArrow,
  TooltipContent,
  TooltipRoot,
} from "~/components/ui/tooltip";
import { getTechnology } from "~/lib/technologies";

export function StudyingCard() {
  const technology = getTechnology("Rust");
  const TechIcon = Icons[technology.icon];

  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.GraduationCap className="size-4" />
        <h2 className="font-light text-sm">Currently studying</h2>
      </div>
      <div className="flex items-center justify-center">
        <TooltipRoot delay={150} closeDelay={200}>
          <LinkPrimitive
            className="outline-hidden"
            href={technology.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TechIcon className="size-20" />
            <span className="sr-only">{technology.name}</span>
          </LinkPrimitive>

          <TooltipContent>
            <TooltipArrow />
            {technology.name}
          </TooltipContent>
        </TooltipRoot>
      </div>
    </div>
  );
}
