"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Fragment } from "react";

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
import type { ProjectSource } from "~/lib/source";
import { getTechnology, technologies } from "~/lib/technologies";
import type { Technologies } from "~/lib/technologies";

import { PreviewRecursiveButton } from "./preview-recursive-button";

function filterProjects(
  initialList: ProjectSource[],
  filter: {
    query: string;
    selectedTechnologies: Technologies[number]["name"][];
  }
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
        technologies.includes(technology)
      )
    ) {
      return false;
    }

    return true;
  });
}

interface ProjectListProps {
  projects: ProjectSource[];
}

interface TechnologyCommand {
  technology: Technologies[number] | null;
  value: string;
}

export function ProjectList({ projects }: ProjectListProps) {
  const [filters, setFilters] = useFilters();
  const commandGroups: { value: string; items: TechnologyCommand[] }[] = [
    {
      value: "technologies",
      items: technologies
        .filter((technology) =>
          projects.some((project) =>
            project.data.technologies.includes(technology.name)
          )
        )
        .map((technology) => ({ value: technology.name, technology })),
    },
    ...(filters.techs.length > 0
      ? [
          {
            value: "actions",
            items: [{ value: "Clear filters", technology: null }],
          },
        ]
      : []),
  ];

  function renderTechnologyCommand(item: TechnologyCommand) {
    const technology = item.technology;
    const Icon = technology ? Icons[technology.icon] : null;
    return (
      <Command.Item
        className={technology ? undefined : "justify-center text-center"}
        key={item.value}
        onClick={() => {
          if (!technology) {
            void setFilters({ techs: [] });
            return;
          }
          void setFilters(({ techs }) => ({
            techs: techs.includes(technology.name)
              ? techs.filter((name) => name !== technology.name)
              : [...techs, technology.name],
          }));
        }}
        value={item}
      >
        {technology && (
          <Icons.Check
            className="mr-2 size-4 opacity-0 transition-opacity data-[visible='true']:opacity-100"
            data-visible={filters.techs.includes(technology.name)}
          />
        )}
        {Icon && <Icon aria-hidden="true" className="mr-2 size-4" />}
        {item.value}
      </Command.Item>
    );
  }

  const filteredProjects = filterProjects(projects, {
    query: filters.q,
    selectedTechnologies: filters.techs,
  });

  return (
    <section className="mt-10 animate-fade-up animate-delay-75">
      <div className="mb-4 flex items-center justify-between gap-4">
        <TextSearch.Root
          className="grow"
          onValueChange={(q) => {
            void setFilters({ q });
          }}
          value={filters.q}
        >
          <Form.Field>
            <TextSearch.Icon />

            <Input placeholder="Search..." />

            <TextSearch.ClearButton />
          </Form.Field>
        </TextSearch.Root>

        <Popover.Root>
          <Popover.Trigger render={<Button size="icon" variant="outline" />}>
            <Icons.Filter className="size-4" />
            <span className="sr-only">Filter by technology</span>
          </Popover.Trigger>

          <Popover.Content align="end" className="p-0">
            <Command.Root
              items={commandGroups}
              itemToStringValue={(item: TechnologyCommand) => item.value}
            >
              <Command.Input placeholder="Search a technology" />
              <Command.Empty>No results found.</Command.Empty>
              <Command.List>
                {(group: (typeof commandGroups)[number]) =>
                  group.value === "actions" ? (
                    <m.div
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      initial={{ opacity: 0, height: 0 }}
                      key={group.value}
                      layout
                    >
                      <Command.Separator />
                      <Command.Group items={group.items}>
                        <Command.Collection>
                          {renderTechnologyCommand}
                        </Command.Collection>
                      </Command.Group>
                    </m.div>
                  ) : (
                    <Fragment key={group.value}>
                      <Command.Group items={group.items}>
                        <Command.Collection>
                          {renderTechnologyCommand}
                        </Command.Collection>
                      </Command.Group>
                    </Fragment>
                  )
                }
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
                animate={{ opacity: 1 }}
                className={CardStyles.Root({
                  className: "motion flex flex-col",
                })}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={project.url}
                layout
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
                          className={BadgeStyles({
                            className: "pressed:scale-95 select-none py-1",
                            variant: "secondary",
                          })}
                          href={tech.url}
                          key={tech.name}
                          rel="noopener noreferrer"
                          target="_blank"
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
                    className="w-full rounded-full sm:w-max"
                    href={project.url}
                    size="sm"
                  >
                    Read more
                  </LinkButton>
                  <div className="flex items-center gap-4 max-sm:w-full">
                    {project.data.previewUrl !== undefined &&
                      project.data.previewUrl !== "" &&
                      (project.data.previewUrl === siteConfig.url ? (
                        <PreviewRecursiveButton className="w-full" />
                      ) : (
                        <LinkButton
                          className="w-full rounded-full"
                          href={project.data.previewUrl}
                          rel="noopener noreferrer"
                          size="sm"
                          target="_blank"
                          variant="outline"
                        >
                          <Icons.Eye className="mr-2 size-4" />
                          Preview
                        </LinkButton>
                      ))}
                    <LinkButton
                      className="w-full rounded-full"
                      href={project.data.sourceCodeUrl}
                      rel="noopener noreferrer"
                      size="sm"
                      target="_blank"
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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            layout
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
    <section className="mt-10 animate-fade-up animate-delay-75">
      <div className="mb-4 flex items-center justify-between gap-4">
        <TextSearch.Root className="grow" disabled>
          <Form.Field>
            <TextSearch.Icon />

            <Input placeholder="Search..." />

            <TextSearch.ClearButton />
          </Form.Field>
        </TextSearch.Root>

        <Button disabled size="icon" variant="outline">
          <Icons.Filter className="size-4" />
          <span className="sr-only">Filter by technology</span>
        </Button>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card.Root key={index}>
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
