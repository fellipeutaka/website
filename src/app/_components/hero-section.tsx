import { BadgeAnimated } from "~/components/ui/badge-animated";
import { LinkButton } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { Spotlight } from "~/components/ui/spotlight";
import { env } from "~/config/env";
import { siteConfig } from "~/config/site";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center rounded-md py-16 md:py-48">
      <Spotlight className="fill-fg max-md:top-0 max-md:left-[10%]" />
      <div className="space-y-4">
        <div className="grid animate-fade-up justify-items-center gap-4">
          {env.AVAILABLE_FOR_WORK && (
            <BadgeAnimated className="flex items-center gap-2 text-sm">
              <Icons.Circle className="size-2 animate-pulse fill-success text-success" />
              Available for work
            </BadgeAnimated>
          )}
          <h1 className="text-center font-bold text-5xl md:text-7xl">
            Fellipe Utaka
          </h1>
          <h2 className="text-center font-bold text-5xl md:text-7xl">
            Full-Stack Developer
          </h2>
        </div>
        <p className="mx-auto max-w-lg animate-delay-100 animate-fade-up text-balance text-center text-muted-fg">
          Obsessed with developer experience, robust, scalable and user-friendly
          applications.
        </p>
        <div className="flex animate-delay-300 animate-fade-up items-center justify-center gap-4">
          <LinkButton
            className="rounded-full"
            href="/documents/resume.pdf"
            download
          >
            <Icons.Download className="mr-2 size-4" />
            Get resume
          </LinkButton>
          <LinkButton
            className="rounded-full"
            variant="outline"
            href={siteConfig.links.contra}
            rel="noopener noreferrer"
          >
            <Icons.Contra className="mr-2 size-4" />
            Hire me on Contra
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
