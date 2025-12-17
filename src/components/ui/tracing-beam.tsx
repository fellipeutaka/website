"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/cva";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
}

export function TracingBeam({ children, className, offset }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset ?? ["center end", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
      ref={ref}
    >
      <div className="absolute top-3 -left-4 md:-left-20">
        <motion.div
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[27px] flex size-4 items-center justify-center rounded-full border border-netural-200 shadow-xs"
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
        >
          <motion.div
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "white" : "oklch(var(--success))",
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "oklch(var(--success))",
            }}
            className="size-2 rounded-full border border-neutral-300 bg-white"
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
          />
        </motion.div>
        <svg
          aria-hidden="true"
          className="ml-4 block"
          height={svgHeight} // Set the SVG height
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            className="motion-reduce:hidden"
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              gradientUnits="userSpaceOnUse"
              id="gradient"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
