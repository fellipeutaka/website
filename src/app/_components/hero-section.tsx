import { BadgeAnimated } from "~/components/ui/badge-animated";
import { LinkButton } from "~/components/ui/link-button";
import { Icons } from "~/components/ui/icons";
import { env } from "~/config/env";
import { siteConfig } from "~/config/site";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden rounded-md py-16 md:py-48">
      <GridPattern />
      <ShadowEffect />

      <div className="container max-w-6xl space-y-4">
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
        <p className="mx-auto max-w-lg animate-delay-100 animate-fade-up text-balance text-center text-muted-foreground">
          Obsessed with developer experience, robust, scalable and user-friendly
          applications.
        </p>
        <div className="flex animate-delay-300 animate-fade-up items-center justify-center gap-4">
          <LinkButton
            className="group rounded-full"
            href="/documents/resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icons.Download className="size-4" />
            Get resume
          </LinkButton>
          <LinkButton
            className="group rounded-full"
            href={siteConfig.links.contra}
            rel="noopener noreferrer"
            variant="outline"
          >
            <Icons.Contra className="size-4 transition-transform duration-300 ease-out group-hover:rotate-180" />
            Hire me on Contra
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

function GridPattern() {
  return (
    <svg
      aria-hidden="true"
      className="-z-10 absolute inset-0 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    >
      <defs>
        <pattern
          height={200}
          id="a"
          patternUnits="userSpaceOnUse"
          width={200}
          x="50%"
          y={-1}
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg className="overflow-visible fill-foreground/5" x="50%" y={-1}>
        <path d="M-200 0H1v201h-201zm800 0h201v201H600zM-400 600h201v201h-201zm600 200h201v201H200z" />
      </svg>
      <rect fill="url(#a)" height="100%" width="100%" />
    </svg>
  );
}

function ShadowEffect() {
  return (
    <div
      aria-hidden="true"
      className="-z-10 absolute top-10 left-[calc(50%-4rem)] transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
    >
      <div
        className="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        style={{
          clipPath:
            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
        }}
      />
    </div>
  );
}
