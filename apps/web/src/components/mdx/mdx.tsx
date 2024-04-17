import { type MDXComponents, MDXRemoteRSC } from "@utaka/mdx";
import { cn } from "@utaka/tailwind";
import {
  Video,
  VideoBottom,
  VideoControls,
  VideoControlsLeft,
  VideoControlsRight,
  VideoDuration,
  VideoFullscreen,
  VideoPictureInPicture,
  VideoPlay,
  VideoPlayer,
  VideoProgressBar,
  VideoVolume,
} from "@utaka/ui";
import { BlurImage } from "../blur-image";
import { File, Files, Folder } from "../files";
import { ImageZoom } from "../image-zoom";
import { Heading } from "./heading";
import { Pre } from "./pre";

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-2 font-bold text-4xl tracking-tight" {...props} />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      className="mt-10 border-b pb-1 font-semibold text-3xl tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      className="mt-8 font-semibold text-2xl tracking-tight"
      {...props}
    />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      className="mt-8 font-semibold text-xl tracking-tight"
      {...props}
    />
  ),
  h5: (props) => (
    <Heading
      as="h5"
      className="mt-8 font-semibold text-lg tracking-tight"
      {...props}
    />
  ),
  h6: (props) => (
    <Heading
      as="h6"
      className="mt-8 font-semibold text-base tracking-tight"
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    <img {...props} className={cn("rounded-md border", className)} alt={alt} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded border px-1 py-0.5 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  pre: Pre,
  Image: (props) => {
    const { alt, ...rest } = props;

    return (
      <>
        <ImageZoom>
          <BlurImage className="rounded-lg border" alt={alt} {...rest} />
        </ImageZoom>
        <figcaption className="mt-4 text-center">{alt}</figcaption>
      </>
    );
  },

  // Custom components
  //  Table,
  //  ItemGrid,
  //  Video,
  Video: (props: React.ComponentPropsWithoutRef<"video">) => (
    <Video>
      <VideoPlayer {...props} />
      <VideoBottom>
        <VideoProgressBar />
        <VideoControls>
          <VideoControlsLeft>
            <VideoPlay />
            <VideoVolume />
            <VideoDuration />
          </VideoControlsLeft>
          <VideoControlsRight>
            <VideoPictureInPicture />
            <VideoFullscreen />
          </VideoControlsRight>
        </VideoControls>
      </VideoBottom>
    </Video>
  ),
  //  LinkCard,
  //  Logo,
  Files,
  File,
  Folder,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  return <MDXRemoteRSC source={code} components={components} />;
}
