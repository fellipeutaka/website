import { getFeaturedProjects } from "@utaka/mdx/utils/fs";
import { technologies } from "@utaka/tech";
import { BentoGrid } from "@utaka/ui/bento-grid";
import { ButtonStyles } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import Link from "next/link";

export function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="animate-delay-700 animate-fade-up">
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">
        Featured projects
      </h2>

      <BentoGrid>
        {featuredProjects.map((project, i) => (
          <BentoGrid.Item
            key={project.name}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          >
            <div className="flex items-center gap-3">
              {project.technologies.map((technology) => {
                const tech = Object.values(technologies).find(
                  (t) => t.name === technology,
                )!;
                const Icon = Icons[tech.icon];

                return (
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={tech.name}
                  >
                    <Icon className="size-6" />
                  </a>
                );
              })}
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
                href={project.sourceCodeUrl}
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

      <Link
        className={ButtonStyles({
          className: "mx-auto my-8 flex w-max",
          variant: "outline",
        })}
        href="/projects"
      >
        See all projects
      </Link>
    </section>
  );
}
