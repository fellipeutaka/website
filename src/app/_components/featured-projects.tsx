import { BentoGrid } from "~/components/ui/bento-grid";
import { LinkButton } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { projectsSource } from "~/lib/source";
import { getTechnology } from "~/lib/technologies";

export function FeaturedProjectsSection() {
  const featuredProjects = projectsSource
    .getPages()
    .filter((project) => project.data.isFeatured);

  return (
    <section className="container max-w-6xl animate-delay-700 animate-fade-up">
      <h2 className="mb-10 font-semibold text-2xl md:text-3xl">
        Featured projects
      </h2>

      <BentoGrid.Root>
        {featuredProjects.map((project, i) => (
          <BentoGrid.Item
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            key={project.data.name}
          >
            <div className="flex flex-wrap items-center gap-3">
              {project.data.technologies.map((technology) => {
                const tech = getTechnology(technology);
                const Icon = Icons[tech.icon];

                return (
                  <a
                    href={tech.url}
                    key={tech.name}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={tech.name}
                  >
                    <Icon className="size-6" />
                  </a>
                );
              })}
            </div>
            <BentoGrid.Body className="flex flex-col justify-end">
              <BentoGrid.Title>{project.data.name}</BentoGrid.Title>
              <BentoGrid.Description>
                {project.data.description}
              </BentoGrid.Description>
            </BentoGrid.Body>
            <div className="mt-4 flex items-center justify-between">
              {project.data.previewUrl && (
                <LinkButton
                  className="rounded-full"
                  href={project.data.previewUrl}
                  rel="noopener noreferrer"
                  size="sm"
                  target="_blank"
                >
                  <Icons.Eye className="mr-2 size-4" />
                  Preview
                </LinkButton>
              )}
              <LinkButton
                className="rounded-full"
                href={project.data.sourceCodeUrl}
                rel="noopener noreferrer"
                size="sm"
                target="_blank"
                variant="secondary"
              >
                <Icons.GitHub className="mr-2 size-4" />
                Source code
              </LinkButton>
            </div>
          </BentoGrid.Item>
        ))}
      </BentoGrid.Root>

      <LinkButton
        className="mx-auto my-8 flex w-max"
        href="/projects"
        variant="outline"
      >
        See all projects
      </LinkButton>
    </section>
  );
}
