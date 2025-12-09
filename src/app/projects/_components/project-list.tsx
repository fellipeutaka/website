"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { BadgeStyles } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardStyles } from "~/components/ui/card";
import { Autocomplete } from "~/components/ui/autocomplete";
import { Form } from "~/components/ui/form";
import { Icons } from "~/components/ui/icons";
import { Input } from "~/components/ui/input";
import { Link } from "~/components/ui/link";
import { Popover } from "~/components/ui/popover";
import { Skeleton } from "~/components/ui/skeleton";
import { SearchField } from "~/components/ui/search-field";
import { siteConfig } from "~/config/site";
import { useFilters } from "~/hooks/use-filters";
import {
  getTechnology,
  type Technologies,
  technologies,
} from "~/lib/technologies";
import type { StripNonSerializable } from "~/utils/strip-non-serializable";
import { PreviewRecursiveButton } from "./preview-recursive-button";
import { LinkButton } from "~/components/ui/link-button";
import { SearchIcon } from "lucide-react";
import { Listbox } from "~/components/ui/list-box";
import { Separator } from "~/components/ui/separator";
import { Textfield } from "~/components/ui/textfield";

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
        <SearchField.Root
          className="grow"
          onChange={(q) => setFilters({ q })}
          value={filters.q}
        >
          <SearchIcon />

          <SearchField.Input placeholder="Search..." />

          <SearchField.Button />
        </SearchField.Root>

        <Popover.Root>
          <Button size="icon" variant="outline">
            <Icons.Filter className="size-4" />
            <span className="sr-only">Filter by technology</span>
          </Button>

          <Popover.Content className="p-0" placement="bottom end">
            <Autocomplete>
              <SearchField.Root aria-label="Technology" autoFocus>
                <SearchIcon />
                <SearchField.Input placeholder="Search a technology" />
                <SearchField.Button />
              </SearchField.Root>

              <Listbox.Root
                renderEmptyState={() => (
                  <Listbox.Empty>No results found.</Listbox.Empty>
                )}
              >
                <Listbox.Group
                  items={technologies.filter((technology) =>
                    projects.some((project) =>
                      project.data.technologies.includes(technology.name)
                    )
                  )}
                >
                  {(technology) => {
                    const Icon = Icons[technology.icon];

                    return (
                      <Listbox.Item
                        key={technology.name}
                        onAction={() =>
                          setFilters(({ techs }) =>
                            techs.includes(technology.name)
                              ? {
                                  techs: techs.filter(
                                    (t) => t !== technology.name
                                  ),
                                }
                              : { techs: [...techs, technology.name] }
                          )
                        }
                        id={technology.name}
                      >
                        <Icons.Check
                          className="size-4 opacity-0 transition-opacity data-[visible='true']:opacity-100"
                          data-visible={filters.techs.includes(technology.name)}
                        />

                        <Icon className="size-4" />
                        {technology.name}
                      </Listbox.Item>
                    );
                  }}
                </Listbox.Group>
                <AnimatePresence>
                  {filters.techs.length > 0 && (
                    <m.div
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      initial={{ opacity: 0, height: 0 }}
                      layout
                    >
                      <Separator />
                      <Listbox.Group>
                        <Listbox.Item
                          className="justify-center text-center"
                          onAction={() => setFilters({ techs: [] })}
                        >
                          Clear filters
                        </Listbox.Item>
                      </Listbox.Group>
                    </m.div>
                  )}
                </AnimatePresence>
              </Listbox.Root>
            </Autocomplete>
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
                          <Icon className="size-4" />
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
                    {project.data.previewUrl &&
                      (project.data.previewUrl === siteConfig.url ? (
                        <PreviewRecursiveButton className="flex-1" />
                      ) : (
                        <LinkButton
                          className="flex-1 rounded-full"
                          href={project.data.previewUrl}
                          rel="noopener noreferrer"
                          size="sm"
                          target="_blank"
                          variant="outline"
                        >
                          <Icons.Eye className="size-4" />
                          Preview
                        </LinkButton>
                      ))}
                    <LinkButton
                      className="flex-1 rounded-full"
                      href={project.data.sourceCodeUrl}
                      rel="noopener noreferrer"
                      size="sm"
                      target="_blank"
                      variant="secondary"
                    >
                      <Icons.GitHub className="size-4" />
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
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <div className="mb-4 flex items-center justify-between gap-4">
        <SearchField.Root className="grow" isDisabled>
          <Textfield>
            <SearchIcon />

            <SearchField.Input placeholder="Search..." />

            <SearchField.Button />
          </Textfield>
        </SearchField.Root>

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
