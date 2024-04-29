"use client";

import { Icons } from "@utaka/ui/icons";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

const fadeMask =
  "radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)";

export function LocationCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,

      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        window.addEventListener("resize", onResize);
      }
    };
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: -0.55,
      dark: 1,
      diffuse: 2,

      mapSamples: 36_000,
      mapBrightness: 2,
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [235 / 255, 35 / 255, 35 / 255],
      glowColor: [0.5, 0.5, 0.5],
      markers: [{ location: [-23.5505, -46.6333], size: 0.1 }], // Sao Paulo coordinates
      scale: 1,
      onRender: (state) => {
        state.phi = 5.8 + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [r]);

  return (
    <div className="relative flex min-h-60 flex-col gap-6 overflow-hidden rounded-xl border p-4 lg:p-6">
      <div className="flex items-center gap-2">
        <Icons.MapPin className="size-4" />
        <h2 className="font-light text-sm">São Paulo, Brazil</h2>
      </div>
      <div className="absolute inset-0 top-0 mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[350px]">
        <div className="flex size-full place-content-center place-items-center overflow-visible">
          <div
            style={{
              WebkitMaskImage: fadeMask,
              maskImage: fadeMask,
            }}
            className="aspect-square w-full max-w-[800px]"
          >
            <canvas
              ref={canvasRef}
              onPointerDown={(e) => {
                if (canvasRef.current) {
                  canvasRef.current.style.cursor = "grabbing";
                }
                pointerInteracting.current =
                  e.clientX - pointerInteractionMovement.current;
              }}
              onPointerUp={() => {
                pointerInteracting.current = null;
                if (canvasRef.current) {
                  canvasRef.current.style.cursor = "grab";
                }
              }}
              onPointerOut={() => {
                pointerInteracting.current = null;
                if (canvasRef.current) {
                  canvasRef.current.style.cursor = "grab";
                }
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta;
                  api.start({
                    r: delta / 200,
                  });
                }
              }}
              onTouchMove={(e) => {
                if (pointerInteracting.current !== null && e.touches[0]) {
                  const delta =
                    e.touches[0].clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta;
                  api.start({
                    r: delta / 100,
                  });
                }
              }}
              className="size-full cursor-auto select-none"
              style={{
                contain: "layout paint size",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
