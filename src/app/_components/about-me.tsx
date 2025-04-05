import * as m from "motion/react-m";
import { LinkButton } from "~/components/ui/button";
import { CodingHours } from "./coding-hours";
import { Connect } from "./connect";
import { LocationCard } from "./location-card";
import { StacksCard } from "./stacks-card";
import { StudyingCard } from "./studying-card";

export function AboutSection() {
  return (
    <section className="container max-w-6xl">
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">About me</h2>

      <m.div
        className="motion grid gap-4 md:grid-cols-2"
        initial={{
          y: 40,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="grid grid-rows-[1fr_auto] gap-4">
          <LocationCard />
          <StacksCard />
        </div>
        <div className="grid gap-4">
          <Connect />
          <div className="grid xs:grid-cols-2 gap-4">
            <CodingHours />
            <StudyingCard />
          </div>
        </div>
      </m.div>
      <LinkButton
        variant="outline"
        className="mx-auto my-8 flex w-max"
        href="/about"
      >
        Know more about me
      </LinkButton>
    </section>
  );
}
