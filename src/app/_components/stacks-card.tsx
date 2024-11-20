import { Icons } from "~/components/ui/icons";
import { LinkPrimitive } from "~/components/ui/link";
import { Marquee } from "~/components/ui/marquee";
import {
  TooltipArrow,
  TooltipContent,
  TooltipRoot,
} from "~/components/ui/tooltip";
import { technologies } from "~/lib/technologies";

export function StacksCard() {
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Zap className="size-4" />
        <h2 className="font-light text-sm">Stacks</h2>
      </div>
      <Marquee
        className="my-auto py-4 [--gap:1.5rem]"
        pauseOnHover
        motionReduce={false}
      >
        {Object.values(technologies).map((technology) => {
          const Icon = Icons[technology.icon];

          return (
            <TooltipRoot key={technology.url} delay={300} closeDelay={0}>
              <LinkPrimitive
                href={technology.url}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={technology.name}
              >
                <Icon className="size-10" />
              </LinkPrimitive>

              <TooltipContent>
                <TooltipArrow />
                {technology.name}
              </TooltipContent>
            </TooltipRoot>
          );
        })}
      </Marquee>
    </div>
  );
}
