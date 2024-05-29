import { Icons } from "@utaka/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@utaka/ui/tooltip";

export function StudyingCard() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.GraduationCap className="size-4" />
        <h2 className="font-light text-sm">Currently studying</h2>
      </div>
      <div className="flex items-center justify-center">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.rust-lang.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.Rust className="size-20" />
                <span className="sr-only">Rust</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>Rust</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
