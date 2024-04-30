"use client";

import type { Project } from "@utaka/mdx/utils/fs";
import { technologies, type technologyList } from "@utaka/tech";
import { Button, ButtonStyles } from "@utaka/ui/button";
import { Card, CardStyles } from "@utaka/ui/card";
import { Command } from "@utaka/ui/command";
import { Icons } from "@utaka/ui/icons";
import { Popover } from "@utaka/ui/popover";
import { TextField } from "@utaka/ui/textfield";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { MotionDiv, MotionP } from "../framer-motion";

interface ProjectListProps {
  projects: Project[];
}

function filterProjects(
  initialList: Project[],
  filter: {
    query: string;
    selectedTechnologies: typeof technologyList;
  },
) {
  return initialList.filter((project) => {
    const query = filter.query.trim().toLowerCase();
    const technologies = filter.selectedTechnologies;

    if (query && !project.name.toLowerCase().includes(query)) {
      return false;
    }

    if (technologies.length > 0) {
      if (
        !project.technologies.some((technology) =>
          technologies.includes(technology),
        )
      ) {
        return false;
      }
    }

    return true;
  });
}

export function ProjectList({ projects }: ProjectListProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    typeof technologyList
  >([]);

  const filteredProjects = filterProjects(projects, {
    query: deferredQuery,
    selectedTechnologies,
  });

  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <div className="mb-4 flex items-center justify-between gap-4">
        <TextField className="grow">
          <TextField.Slot>
            <Icons.Search className="size-4 text-muted-foreground" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </TextField>

        <Popover>
          <Popover.Trigger asChild>
            <Button size="icon" variant="outline">
              <Icons.Filter className="size-4" />
              <span className="sr-only">Filter by technology</span>
            </Button>
          </Popover.Trigger>
          <Popover.Content className="p-0" align="end">
            <Command>
              <Command.Input placeholder="Search a technology" />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group>
                  {Object.values(technologies).map((technology) => {
                    const Icon = Icons[technology.icon];

                    return (
                      <Command.Item
                        key={technology.name}
                        value={technology.name}
                        onSelect={() =>
                          setSelectedTechnologies((technologies) =>
                            technologies.includes(technology.name)
                              ? technologies.filter(
                                  (t) => t !== technology.name,
                                )
                              : [...technologies, technology.name],
                          )
                        }
                      >
                        <Icons.Check
                          data-visible={selectedTechnologies.includes(
                            technology.name,
                          )}
                          className="mr-2 size-4 opacity-0 transition-opacity data-[visible='true']:opacity-100"
                        />

                        <Icon className="mr-2 size-4" />
                        {technology.name}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
                <AnimatePresence>
                  {selectedTechnologies.length > 0 && (
                    <MotionDiv
                      layout
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      initial={{ opacity: 0, height: 0 }}
                    >
                      <Command.Separator />
                      <Command.Group>
                        <Command.Item
                          onSelect={() => setSelectedTechnologies([])}
                          className="justify-center text-center"
                        >
                          Clear filters
                        </Command.Item>
                      </Command.Group>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </Command.List>
            </Command>
          </Popover.Content>
        </Popover>
      </div>

      <ProjectCardList projects={filteredProjects} />
    </section>
  );
}

function ProjectCardList({ projects }: ProjectListProps) {
  return (
    <AnimatePresence>
      {projects.length > 0 ? (
        <div className="grid w-full gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <MotionDiv
              className={CardStyles.Root()}
              layout
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={project.slug}
            >
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
            </MotionDiv>
          ))}
        </div>
      ) : (
        <MotionP
          layout
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          No projects found.
        </MotionP>
      )}
    </AnimatePresence>
  );
}
