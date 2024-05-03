import { useTranslations } from "@utaka/i18n";
import { technologies } from "@utaka/tech";
import { Icons } from "@utaka/ui/icons";
import { Marquee } from "@utaka/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@utaka/ui/tooltip";

export function StacksCard() {
  const t = useTranslations("components.home.stacks-card");

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.Zap className="size-4" />
        <h2 className="font-light text-sm">{t("title")}</h2>
      </div>
      <TooltipProvider delayDuration={300}>
        <Marquee className="my-auto py-4 [--gap:1.5rem]" pauseOnHover>
          {Object.values(technologies).map((technology) => {
            const Icon = Icons[technology.icon];

            return (
              <Tooltip key={technology.url}>
                <TooltipTrigger asChild>
                  <a
                    href={technology.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={technology.name}
                  >
                    <Icon className="size-10" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{technology.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </Marquee>
      </TooltipProvider>
    </div>
  );
}
