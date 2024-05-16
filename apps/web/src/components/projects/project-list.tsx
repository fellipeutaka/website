"use client";

import type { Project } from "@utaka/mdx/utils/fs";
import { getTechnology, technologies, type technologyList } from "@utaka/tech";
import { BadgeStyles } from "@utaka/ui/badge";
import { Button, ButtonStyles } from "@utaka/ui/button";
import { Card, CardStyles } from "@utaka/ui/card";
import { Command } from "@utaka/ui/command";
import { Icons } from "@utaka/ui/icons";
import { Popover } from "@utaka/ui/popover";
import { Skeleton } from "@utaka/ui/skeleton";
import { TextField } from "@utaka/ui/textfield";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { siteConfig } from "~/config/site";
import { MotionDiv, MotionP } from "../framer-motion";
import { PreviewRecursiveButton } from "./preview-recursive-button";

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

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const deferredQuery = useDeferredValue(query);
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    typeof technologyList
  >([]);

  const filteredProjects = filterProjects(projects, {
    query: deferredQuery,
    selectedTechnologies,
  });

  function setQuery(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

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

      <AnimatePresence>
        {filteredProjects.length > 0 ? (
          <div className="grid w-full gap-4 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <MotionDiv
                className={CardStyles.Root({
                  className: "flex flex-col",
                })}
                layout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={project.slug}
              >
                <Card.Header>
                  <Card.Title>{project.name}</Card.Title>
                </Card.Header>
                <Card.Content className="flex-1">
                  <p>{project.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {project.technologies.map((technology) => {
                      const tech = getTechnology(technology);
                      const Icon = Icons[tech.icon];

                      return (
                        <a
                          key={technology}
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={BadgeStyles({
                            className: "py-1",
                            variant: "secondary",
                          })}
                        >
                          <Icon className="mr-2 size-4" />
                          {technology}
                        </a>
                      );
                    })}
                  </div>
                </Card.Content>
                <Card.Footer className="flex-col justify-between gap-2 sm:flex-row">
                  <Link
                    className={ButtonStyles({
                      class: "w-full rounded-full sm:w-max",
                      size: "sm",
                    })}
                    href={`/projects/${project.slug}`}
                  >
                    Read more
                  </Link>
                  <div className="flex items-center gap-4 max-sm:w-full">
                    {project.previewUrl &&
                      (project.previewUrl === siteConfig.url ? (
                        <PreviewRecursiveButton className="w-full" />
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full"
                          asChild
                        >
                          <a
                            href={project.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icons.Eye className="mr-2 size-4" />
                            Preview
                          </a>
                        </Button>
                      ))}
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ButtonStyles({
                        class: "w-full rounded-full",
                        size: "sm",
                        variant: "secondary",
                      })}
                    >
                      <Icons.GitHub className="mr-2 size-4" />
                      Repository
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
    </section>
  );
}

export function ProjectListSkeleton() {
  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <div className="mb-4 flex items-center justify-between gap-4">
        <TextField className="grow">
          <TextField.Slot>
            <Icons.Search className="size-4 text-muted-foreground" />
          </TextField.Slot>
          <TextField.Input placeholder="Search projects" disabled />
        </TextField>

        <Button disabled size="icon" variant="outline">
          <Icons.Filter className="size-4" />
          <span className="sr-only">Filter by technology</span>
        </Button>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton loader
            key={index}
          >
            <Card.Header>
              <Skeleton className="h-6 w-64" />
            </Card.Header>
            <Card.Content className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-1/2" />
            </Card.Content>
            <Card.Footer className="justify-between">
              <Skeleton className="h-9 w-24 rounded-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-9 w-32 rounded-full" />
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}
