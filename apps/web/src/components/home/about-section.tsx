import { useTranslations } from "@utaka/i18n";
import { ButtonStyles } from "@utaka/ui/button";
import Link from "next/link";
import { MotionDiv } from "../framer-motion";
import { CodingHours } from "./coding-hours";
import { Connect } from "./connect";
import { LocationCard } from "./location-card";
import { StacksCard } from "./stacks-card";
import { StudyingCard } from "./studying-card";

export function AboutSection() {
  const t = useTranslations("components.home.about-section");

  return (
    <section>
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">{t("title")}</h2>

      <MotionDiv
        className="grid gap-4 md:grid-cols-2"
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
        <div className="grid grid-rows-[1fr,auto] gap-4">
          <LocationCard />
          <StacksCard />
        </div>
        <div className="grid gap-4">
          <Connect />
          <div className="grid gap-4 xs:grid-cols-2">
            <CodingHours />
            <StudyingCard />
          </div>
        </div>
      </MotionDiv>
      <Link
        className={ButtonStyles({
          class: "mx-auto my-8 flex w-max",
          variant: "outline",
        })}
        href="/about"
      >
        {t("know-more")}
      </Link>
    </section>
  );
}
