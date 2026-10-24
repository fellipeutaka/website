import { ImageResponse } from "next/og";

import { siteConfig } from "~/config/site";

interface OpenGraphImageProps {
  title: string;
  description?: string;
}

export function createOpenGraphImage(props: OpenGraphImageProps) {
  return new ImageResponse(<OpenGraphImage {...props} />, {
    width: 1200,
    height: 630,
  });
}

function OpenGraphImage({ title, description }: OpenGraphImageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 64,
        background: "#101116",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg
          aria-hidden="true"
          fill="none"
          height="48"
          viewBox="0 0 32 32"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.2 23.5H9.5V6h11.6v3.1h-7.9v4.1h7.1v3.1h-7.1Z"
            fill="#c4b5fd"
          />
        </svg>
        <span style={{ fontSize: 28 }}>{siteConfig.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 55 ? 64 : 76,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            overflowWrap: "break-word",
          }}
        >
          {title}
        </div>
        {description !== undefined && description !== "" && (
          <div style={{ fontSize: 28, lineHeight: 1.45, color: "#b9b9c6" }}>
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #30303c",
          paddingTop: 24,
          fontSize: 24,
          color: "#c4b5fd",
        }}
      >
        {new URL(siteConfig.url).hostname}
      </div>
    </div>
  );
}
