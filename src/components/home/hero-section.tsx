import { BadgeAnimated } from "~/components/ui/badge-animated";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { siteConfig } from "~/config/site";
import { Spotlight } from "../ui/spotlight";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center rounded-md bg-background/[0.96] py-16 md:py-48">
      <Spotlight className="fill-foreground max-md:top-0 max-md:left-[10%]" />
      <div className="space-y-4">
        <div className="grid animate-fade-up justify-items-center gap-4">
          <BadgeAnimated className="flex items-center gap-2 text-sm">
            <Icons.Circle className="size-2 animate-pulse fill-green-600 text-green-600" />
            Available for work
          </BadgeAnimated>
          <h1 className="text-center font-bold text-5xl md:text-7xl">
            Fellipe Utaka
          </h1>
          <h2 className="text-center font-bold text-5xl md:text-7xl">
            Full-Stack Developer
          </h2>
        </div>
        <p className="mx-auto max-w-lg animate-delay-100 animate-fade-up text-balance text-center text-muted-foreground">
          Obsessed with developer experience, robust, scalable and user-friendly
          applications.
        </p>
        <div className="flex animate-delay-300 animate-fade-up items-center justify-center gap-4">
          <Button className="rounded-full">
            <Icons.Download className="mr-2 size-4" />
            Get resume
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href={siteConfig.links.contra} rel="noopener noreferrer">
              <Icons.Contra className="mr-2 size-4" />
              Hire me on Contra
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
