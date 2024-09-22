"use client";

import * as motion from "framer-motion/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "~/config/site";

function isActive(href: string, path: string) {
  return path.includes(href);
}

export function MainNav() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <nav className="ml-6 hidden items-center text-sm md:flex">
      {navLinks.map((item) => (
        <Link
          key={item.href}
          className="relative px-3 py-2 text-foreground/60 transition-colors hover:text-foreground data-[active='true']:text-foreground"
          data-active={isActive(item.href, pathname)}
          href={item.href}
          onMouseOver={() => setHoveredPath(item.href)}
          onMouseLeave={() => setHoveredPath(pathname)}
        >
          <span>{item.label}</span>
          {isActive(item.href, hoveredPath) && (
            <motion.div
              className="-z-10 absolute bottom-0 left-0 size-full rounded-full bg-muted"
              layoutId="navbar"
              aria-hidden="true"
              transition={{
                duration: 0.15,
              }}
            />
          )}
          {isActive(item.href, pathname) && (
            <motion.div
              className="-z-10 absolute bottom-0 left-0 size-full rounded-full bg-muted"
              aria-hidden="true"
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
