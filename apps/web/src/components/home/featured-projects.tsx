import { BentoGrid, ButtonStyles, Icons } from "@utaka/ui";
import { projects } from "~/config/projects";

export function FeaturedProjectsSection() {
  return (
    <section className="animate-delay-700 animate-fade-up">
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">
        Featured projects
      </h2>

      <BentoGrid>
        {projects.map((project, i) => (
          <BentoGrid.Item
            key={project.name}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          >
            <div className="flex items-center gap-3">
              {project.technologies.map((technology) => (
                <a
                  key={technology.name}
                  href={technology.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={technology.name}
                >
                  <technology.icon className="size-6" />
                </a>
              ))}
            </div>
            <BentoGrid.Body className="flex flex-col justify-end">
              <BentoGrid.Title>{project.name}</BentoGrid.Title>
              <BentoGrid.Description>
                {project.description}
              </BentoGrid.Description>
            </BentoGrid.Body>
            <div className="mt-4 flex items-center justify-between">
              {project.previewUrl && (
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ButtonStyles({
                    class: "rounded-full",
                    size: "sm",
                  })}
                >
                  <Icons.Eye className="mr-2 size-4" />
                  Preview
                </a>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={ButtonStyles({
                  class: "rounded-full",
                  size: "sm",
                  variant: "secondary",
                })}
              >
                <Icons.GitHub className="mr-2 size-4" />
                Source code
              </a>
            </div>
          </BentoGrid.Item>
        ))}
      </BentoGrid>
    </section>
  );
}
