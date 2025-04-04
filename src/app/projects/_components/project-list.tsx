"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { BadgeStyles } from "~/components/ui/badge";
import { Button, LinkButton } from "~/components/ui/button";
import { Card, CardStyles } from "~/components/ui/card";
import { Command } from "~/components/ui/command";
import { Form } from "~/components/ui/form";
import { Icons } from "~/components/ui/icons";
import { Input } from "~/components/ui/input";
import { Link } from "~/components/ui/link";
import { Popover } from "~/components/ui/popover";
import { Skeleton } from "~/components/ui/skeleton";
import { TextSearch } from "~/components/ui/text-search";
import { siteConfig } from "~/config/site";
import { useFilters } from "~/hooks/use-filters";
import {
  type Technologies,
  getTechnology,
  technologies,
} from "~/lib/technologies";
import type { StripNonSerializable } from "~/utils/strip-non-serializable";
import { PreviewRecursiveButton } from "./preview-recursive-button";

type Project = StripNonSerializable<
  NonNullable<
    Awaited<ReturnType<typeof import("~/lib/source").projectsSource.getPage>>
  >
>;

function filterProjects(
  initialList: Project[],
  filter: {
    query: string;
    selectedTechnologies: Technologies[number]["name"][];
  },
) {
  return initialList.filter((project) => {
    const query = filter.query.trim().toLowerCase();
    const technologies = filter.selectedTechnologies;

    if (query && !project.data.name.toLowerCase().includes(query)) {
      return false;
    }

    if (
      technologies.length > 0 &&
      !project.data.technologies.some((technology) =>
        technologies.includes(technology),
      )
    ) {
      return false;
    }

    return true;
  });
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [filters, setFilters] = useFilters();

  const filteredProjects = filterProjects(projects, {
    query: filters.q,
    selectedTechnologies: filters.techs,
  });

  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <div className="mb-4 flex items-center justify-between gap-4">
        <TextSearch.Root
          value={filters.q}
          onChange={(q) => setFilters({ q })}
          className="grow"
        >
          <Form.Field>
            <TextSearch.Icon />

            <Input placeholder="Search..." />

            <TextSearch.ClearButton />
          </Form.Field>
        </TextSearch.Root>

        <Popover.Root>
          <Button size="icon" variant="outline">
            <Icons.Filter className="size-4" />
            <span className="sr-only">Filter by technology</span>
          </Button>

          <Popover.Content className="p-0" placement="bottom end">
            <Command.Root>
              <Command.Input placeholder="Search a technology" />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group>
                  {technologies
                    .filter((technology) =>
                      projects.some((project) =>
                        project.data.technologies.includes(technology.name),
                      ),
                    )
                    .map((technology) => {
                      const Icon = Icons[technology.icon];

                      return (
                        <Command.Item
                          key={technology.name}
                          value={technology.name}
                          onSelect={() =>
                            setFilters(({ techs }) =>
                              techs.includes(technology.name)
                                ? {
                                    techs: techs.filter(
                                      (t) => t !== technology.name,
                                    ),
                                  }
                                : { techs: [...techs, technology.name] },
                            )
                          }
                        >
                          <Icons.Check
                            data-visible={filters.techs.includes(
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
                  {filters.techs.length > 0 && (
                    <m.div
                      layout
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      initial={{ opacity: 0, height: 0 }}
                    >
                      <Command.Separator />
                      <Command.Group>
                        <Command.Item
                          onSelect={() => setFilters({ techs: [] })}
                          className="justify-center text-center"
                        >
                          Clear filters
                        </Command.Item>
                      </Command.Group>
                    </m.div>
                  )}
                </AnimatePresence>
              </Command.List>
            </Command.Root>
          </Popover.Content>
        </Popover.Root>
      </div>

      <AnimatePresence>
        {filteredProjects.length > 0 ? (
          <div className="grid w-full gap-4 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <m.div
                className={CardStyles.Root({
                  className: "motion flex flex-col",
                })}
                layout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={project.url}
              >
                <Card.Header>
                  <Card.Title>{project.data.name}</Card.Title>
                </Card.Header>
                <Card.Content className="flex-1">
                  <p>{project.data.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {project.data.technologies.map((technology) => {
                      const tech = getTechnology(technology);
                      const Icon = Icons[tech.icon];

                      return (
                        <Link
                          key={tech.name}
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={BadgeStyles({
                            className: "pressed:scale-95 select-none py-1",
                            variant: "secondary",
                          })}
                        >
                          <Icon className="mr-2 size-4" />
                          {tech.name}
                        </Link>
                      );
                    })}
                  </div>
                </Card.Content>
                <Card.Footer className="flex-col justify-between gap-2 sm:flex-row">
                  <LinkButton
                    size="sm"
                    className="w-full rounded-full sm:w-max"
                    href={project.url}
                  >
                    Read more
                  </LinkButton>
                  <div className="flex items-center gap-4 max-sm:w-full">
                    {project.data.previewUrl &&
                      (project.data.previewUrl === siteConfig.url ? (
                        <PreviewRecursiveButton className="w-full" />
                      ) : (
                        <LinkButton
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full"
                          href={project.data.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icons.Eye className="mr-2 size-4" />
                          Preview
                        </LinkButton>
                      ))}
                    <LinkButton
                      href={project.data.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-full"
                      size="sm"
                      variant="secondary"
                    >
                      <Icons.GitHub className="mr-2 size-4" />
                      Repository
                    </LinkButton>
                  </div>
                </Card.Footer>
              </m.div>
            ))}
          </div>
        ) : (
          <m.p
            layout
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            No projects found.
          </m.p>
        )}
      </AnimatePresence>
    </section>
  );
}

export function ProjectListSkeleton() {
  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <div className="mb-4 flex items-center justify-between gap-4">
        <TextSearch.Root isDisabled className="grow">
          <Form.Field>
            <TextSearch.Icon />

            <Input placeholder="Search..." />

            <TextSearch.ClearButton />
          </Form.Field>
        </TextSearch.Root>

        <Button isDisabled size="icon" variant="outline">
          <Icons.Filter className="size-4" />
          <span className="sr-only">Filter by technology</span>
        </Button>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card.Root
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
          </Card.Root>
        ))}
      </div>
    </section>
  );
}
