import { BentoGrid } from "~/components/ui/bento-grid";
import { LinkButton } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { projectsSource } from "~/lib/source";
import { getTechnology } from "~/lib/technologies";

export async function FeaturedProjectsSection() {
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
            key={project.data.name}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          >
            <div className="flex items-center gap-3">
              {project.data.technologies.map((technology) => {
                const tech = getTechnology(technology);
                const Icon = Icons[tech.icon];

                return (
                  <a
                    key={tech.name}
                    href={tech.url}
                    title={tech.name}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  href={project.data.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full"
                  size="sm"
                >
                  <Icons.Eye className="mr-2 size-4" />
                  Preview
                </LinkButton>
              )}
              <LinkButton
                href={project.data.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full"
                size="sm"
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
        variant="outline"
        href="/projects"
      >
        See all projects
      </LinkButton>
    </section>
  );
}
