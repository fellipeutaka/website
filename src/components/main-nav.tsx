"use client";

import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "~/config/site";
import { useHash } from "~/hooks/use-hash";

function isActive(href: string, path: string) {
  return path.includes(href);
}

export function MainNav() {
  const pathname = usePathname();
  const hash = useHash();
  const [hoveredPath, setHoveredPath] = useState(pathname + hash);

  useEffect(() => {
    setHoveredPath(pathname + hash);
  }, [pathname, hash]);

  return (
    <nav className="ml-6 hidden items-center text-sm md:flex">
      {navLinks.map((item) => (
        <Link
          className="relative px-3 py-2 text-fg/60 transition-colors hover:text-fg data-[active='true']:text-fg"
          data-active={isActive(item.href, pathname)}
          href={item.href}
          key={item.href}
          onMouseLeave={() => setHoveredPath(pathname)}
          onMouseOver={() => setHoveredPath(item.href)}
        >
          <span>{item.label}</span>
          {isActive(item.href, hoveredPath) && (
            <m.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 -z-10 size-full rounded-full bg-muted"
              layoutId="navbar"
              transition={{
                duration: 0.15,
              }}
            />
          )}
          {isActive(item.href, pathname) && (
            <m.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 -z-10 size-full rounded-full bg-muted"
              transition={{
                duration: 0.15,
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
