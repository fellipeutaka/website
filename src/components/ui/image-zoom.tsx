"use client";

import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";
import "~/styles/image-zoom.css";

export const ImageZoom = (props: React.ComponentProps<typeof Zoom>) => {
  const { children, ...rest } = props;

  return (
    <Zoom zoomMargin={40} {...rest}>
      {children}
    </Zoom>
  );
};
