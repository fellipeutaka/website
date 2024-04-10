import { Card } from "~/components/ui/card";
import { TracingBeam } from "~/components/ui/tracing-beam";
import { experiences } from "~/config/experiences";
import { cn } from "~/lib/utils";
import { MotionDiv } from "../framer-motion";
import { Badge } from "../ui/badge";

export function ExperienceSection() {
  return (
    <section
      className="animate-delay-700 animate-fade-up scroll-m-32"
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

function ExperienceList(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={cn("flex flex-col gap-4", props.className)}>
      {experiences.map((experience) => (
        <Card key={experience.title} className="w-full">
          <MotionDiv
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
              <Card.Description>{experience.date}</Card.Description>
            </Card.Header>
          </MotionDiv>
          <Card.Content className="flex flex-col gap-4">
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4 },
              }}
            >
              <p className="leading-7">{experience.description}</p>
            </MotionDiv>
            {experience.skills && (
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <MotionDiv
                    key={skill}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.1, delay: index / 40 },
                    }}
                  >
                    <Badge>{skill}</Badge>
                  </MotionDiv>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
