import { getProjects } from "@utaka/mdx/utils/fs";
import { ButtonStyles } from "@utaka/ui/button";
import { Card } from "@utaka/ui/card";
import { Icons } from "@utaka/ui/icons";
import Link from "next/link";

export default function Page() {
  const projects = getProjects();

  return (
    <main className="container my-20 animate-fade-up">
      <h1 className="font-semibold text-2xl md:text-3xl">Projects</h1>
      <section className="mt-10 grid w-full gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.slug}>
            <Card.Header>
              <Card.Title>{project.name}</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>{project.description}</p>
            </Card.Content>
            <Card.Footer className="justify-between">
              <Link
                className={ButtonStyles({
                  class: "rounded-full",
                  size: "sm",
                })}
                href={`/projects/${project.slug}`}
              >
                Read more
              </Link>
              <div className="flex items-center gap-4">
                {project.previewUrl && (
                  <a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ButtonStyles({
                      variant: "outline",
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
            </Card.Footer>
          </Card>
        ))}
      </section>
    </main>
  );
}
