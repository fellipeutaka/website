import {
  Icons,
  Marquee,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@utaka/ui";
import { technologies } from "~/config/technology";

const techList = Object.values(technologies);

export function StacksCard() {
  return (
    <div className="flex h-60 flex-col gap-2 overflow-hidden rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Zap className="size-4" />
        <h2 className="font-light text-sm">Stacks</h2>
      </div>
      <TooltipProvider delayDuration={300}>
        <Marquee className="my-auto py-4 [--gap:1.5rem]" pauseOnHover>
          {techList.map((technology) => (
            <Tooltip key={technology.url}>
              <TooltipTrigger asChild>
                <a
                  href={technology.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={technology.name}
                >
                  <technology.icon className="size-10" />
                </a>
              </TooltipTrigger>
              <TooltipContent>{technology.name}</TooltipContent>
            </Tooltip>
          ))}
        </Marquee>
      </TooltipProvider>
    </div>
  );
}
