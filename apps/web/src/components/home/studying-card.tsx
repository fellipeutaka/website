import {
  Icons,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@utaka/ui";

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
            <TooltipTrigger>
              <Icons.Php className="size-20" />
              <span className="sr-only">PHP</span>
            </TooltipTrigger>
            <TooltipContent sideOffset={-12}>It's a joke 🤣</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
