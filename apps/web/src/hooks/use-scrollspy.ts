import { useEffect, useRef, useState } from "react";

export function useScrollSpy(ids: string[], options: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>();
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const elements = ids.map((id) => document.querySelector(id));

    if (observer.current) {
      observer.current?.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    }, options);

    for (const el of elements) {
      el && observer.current?.observe(el);
    }

    return () => observer.current?.disconnect();
  }, [ids, options]);

  return activeId;
}
