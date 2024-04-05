import { BentoGrid } from "~/components/ui/bento-grid";
import { ButtonStyles } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { projects } from "~/config/projects";

export function FeaturedProjects() {
  return (
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
            <BentoGrid.Description>{project.description}</BentoGrid.Description>
          </BentoGrid.Body>
          <div className="mt-4 flex items-center justify-between">
            {project.previewUrl && (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={ButtonStyles({ class: "rounded-full", size: "sm" })}
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
  );
}
