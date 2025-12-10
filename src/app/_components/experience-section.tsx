import * as m from "motion/react-m";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { TracingBeam } from "~/components/ui/tracing-beam";
import { experiences } from "~/config/experiences";
import { cn } from "~/lib/cva";
import { formatRange } from "~/utils/date";

export function ExperienceSection() {
  return (
    <section
      className="container max-w-6xl animate-delay-700 animate-fade-up scroll-m-32"
      id="experience"
    >
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">Experience</h2>

      <TracingBeam className="hidden px-6 md:flex md:flex-col">
        <ExperienceList />
      </TracingBeam>
      <ExperienceList className="md:hidden" />
    </section>
  );
}

function ExperienceList(props: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("flex flex-col gap-4", props.className)}>
      {experiences.map((experience) => (
        <Card.Root className="w-full overflow-hidden" key={experience.company}>
          <m.div
            className="motion"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4 },
            }}
          >
            <Card.Header>
              <Card.Title>
                {experience.title} · {experience.company}
              </Card.Title>
              <Card.Description>
                {formatRange(experience.startedAt, experience.endedAt)}
              </Card.Description>
            </Card.Header>
          </m.div>
          <Card.Content className="flex flex-col gap-4">
            <m.div
              className="motion"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4 },
              }}
            >
              <p className="leading-7">{experience.description}</p>
            </m.div>
            {experience.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <m.div
                    className="motion"
                    initial={{ opacity: 0, y: 30 }}
                    key={skill}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.1, delay: index / 40 },
                    }}
                  >
                    <Badge>{skill}</Badge>
                  </m.div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card.Root>
      ))}
    </div>
  );
}
