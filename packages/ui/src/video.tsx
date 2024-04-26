"use client";

import { cn } from "@utaka/tailwind";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icons } from "./icons";
import { Slider } from "./slider";

interface VideoState {
  playing: boolean;
  muted: boolean;
  caption: boolean | null;
  fullscreen: boolean;
  idle: boolean;
  pictureInPicture: boolean;
  volume: number;
  playbackRate: number;
  currentTime: number;
  duration: number;
}

interface VideoFunctions {
  handleTimeUpdate: () => void;
  handleDurationChange: () => void;
  onVideoClick: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => void;
  togglePlaying: () => void;
  handleVolumeChange: (value: number) => void;
  handleToggleMuted: () => void;
  handleTimeChange: (value: number) => void;
  handlePlaybackRateChange: (value: number) => void;
  handleToggleFullscreen: () => void;
  handleTogglePictureInPicture: () => void;
  handleToggleCaption: () => void;
}

interface VideoContextType extends VideoState, VideoFunctions {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoContext = createContext({} as VideoContextType);

const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};

const initialState: VideoState = {
  playing: false,
  muted: false,
  caption: false,
  fullscreen: false,
  idle: false,
  pictureInPicture: false,
  volume: 0.5,
  playbackRate: 1,
  currentTime: 0,
  duration: 0,
};

const DEFAULT_EVENTS: (keyof DocumentEventMap)[] = [
  "keypress",
  "mousemove",
  "touchmove",
  "click",
  "scroll",
];

type VideoRootProps = React.ComponentPropsWithoutRef<"div">;

export function VideoRoot({ children, className, ...props }: VideoRootProps) {
  const [playerState, setState] = useState(initialState);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function togglePlaying() {
    setState((prevState) => ({
      ...prevState,
      playing: !prevState.playing,
    }));

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }

  function handleTimeUpdate() {
    if (videoRef.current) {
      setState((prevState) => ({
        ...prevState,
        currentTime: videoRef.current?.currentTime ?? 0,
      }));
    }
  }

  function handleDurationChange() {
    if (videoRef.current) {
      setState((prevState) => ({
        ...prevState,
        duration: videoRef.current?.duration ?? 0,
      }));
    }
  }

  function handleTimeChange(value: number) {
    setState((prevState) => ({
      ...prevState,
      currentTime: value,
    }));

    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  }

  function handleVolumeChange(value: number) {
    setState((prevState) => ({
      ...prevState,
      volume: value,
      muted: value === 0,
    }));

    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
    }
  }

  function handleToggleMuted() {
    setState((prevState) => ({
      ...prevState,
      muted: !prevState.muted,
    }));

    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }

  function handlePlaybackRateChange(value: number) {
    setState((prevState) => ({
      ...prevState,
      playbackRate: value,
    }));

    if (videoRef.current) {
      videoRef.current.playbackRate = value;
    }
  }

  function handleToggleFullscreen() {
    setState((prevState) => {
      return {
        ...prevState,
        fullscreen: !prevState.fullscreen,
      };
    });

    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function handleTogglePictureInPicture() {
    setState((prevState) => ({
      ...prevState,
      pictureInPicture: !prevState.pictureInPicture,
    }));

    if (videoRef.current) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        videoRef.current.requestPictureInPicture();
      }
    }
  }

  function handleToggleCaption() {
    setState((prevState) => ({
      ...prevState,
      caption: !prevState.caption,
    }));

    if (videoRef.current) {
      const track = videoRef.current.textTracks[0];
      track.mode = track.mode === "showing" ? "hidden" : "showing";
    }
  }

  function onVideoClick(e: React.MouseEvent<HTMLVideoElement, MouseEvent>) {
    if (e.detail === 2) {
      handleToggleFullscreen();
    } else if (e.detail === 1) {
      togglePlaying();
    }
  }

  const timer = useRef<number>();

  useEffect(() => {
    if (videoRef.current) {
      const captions = videoRef.current.textTracks;
      setState((prevState) => ({
        ...prevState,
        volume: initialState.volume,
        muted: videoRef.current?.muted ?? initialState.muted,
        caption:
          captions.length > 0
            ? captions[0].mode === "showing" ?? initialState.caption
            : null,
        playbackRate:
          videoRef.current?.playbackRate ?? initialState.playbackRate,
        duration: videoRef.current?.duration ?? initialState.duration,
      }));
    }

    const handleEvents = () => {
      setState((prevState) => ({
        ...prevState,
        idle: false,
      }));

      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          idle: true,
        }));
      }, 2_000);
    };

    const container = containerRef.current;

    for (const event of DEFAULT_EVENTS) {
      container?.addEventListener(event, handleEvents);
    }

    return () => {
      for (const event of DEFAULT_EVENTS) {
        container?.removeEventListener(event, handleEvents);
      }
    };
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videoRef,
        ...playerState,
        handleTimeUpdate,
        handleDurationChange,
        onVideoClick,
        togglePlaying,
        handleVolumeChange,
        handleToggleMuted,
        handleTimeChange,
        handlePlaybackRateChange,
        handleToggleFullscreen,
        handleTogglePictureInPicture,
        handleToggleCaption,
      }}
    >
      <div
        className={cn("group relative", className)}
        ref={containerRef}
        {...props}
      >
        {children}
      </div>
    </VideoContext.Provider>
  );
}

type PlayerProps = React.ComponentPropsWithoutRef<"video">;

export function VideoPlayer({ className, ...props }: PlayerProps) {
  const { videoRef, handleTimeUpdate, handleDurationChange, onVideoClick } =
    useVideo();

  return (
    <video
      ref={videoRef}
      onTimeUpdate={handleTimeUpdate}
      onDurationChange={handleDurationChange}
      onClick={onVideoClick}
      className={cn("[&::-webkit-media-controls]:hidden", className)}
      {...props}
    />
  );
}

type VideoBottomProps = React.ComponentPropsWithoutRef<"div">;

export const VideoBottom = forwardRef<HTMLDivElement, VideoBottomProps>(
  function Bottom({ className, ...props }, ref) {
    const { playing, fullscreen, idle } = useVideo();

    useEffect(() => {
      if (fullscreen && idle && playing) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "default";
      }
    }, [fullscreen, idle, playing]);

    return (
      <div
        ref={ref}
        className={cn(
          "absolute bottom-0 flex w-full flex-col transition",
          !fullscreen && "group-hover:opacity-100",
          !playing ? "opacity-100" : "opacity-0",
          idle ? "opacity-0" : "opacity-100",
          "bg-gradient-to-b from-transparent to-black/80",
          className,
        )}
        {...props}
      />
    );
  },
);

type VideoControlsProps = React.ComponentPropsWithoutRef<"div">;

export const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps>(
  function Controls({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex h-12 items-center", className)}
        {...props}
      />
    );
  },
);

export function VideoControlsLeft({ className, ...props }: VideoBottomProps) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center gap-2",
        "text-white text-opacity-75",
        className,
      )}
      {...props}
    />
  );
}

export function VideoControlsRight({ className, ...props }: VideoBottomProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        "text-white text-opacity-75",
        className,
      )}
      {...props}
    />
  );
}

export function VideoPlay() {
  const { playing, togglePlaying } = useVideo();

  return (
    <button
      type="button"
      className="grid size-12 place-content-center"
      onClick={togglePlaying}
    >
      {playing ? (
        <Icons.Pause className="size-4" />
      ) : (
        <Icons.Play className="size-4" />
      )}
    </button>
  );
}

export function VideoNext() {
  return (
    <button type="button" className="grid size-12 place-content-center">
      <Icons.ChevronLast />
    </button>
  );
}

export function VideoSubtitle() {
  const { caption, handleToggleCaption } = useVideo();

  return (
    <button
      type="button"
      onClick={handleToggleCaption}
      disabled={caption === null}
      className={cn(
        "grid size-12 place-content-center",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "origin-center will-change-transform after:block after:h-0.5 after:w-0 after:scale-0 after:transform-gpu after:rounded-full after:bg-primary after:transition-all after:duration-500 after:content-['']",
        caption && "after:w-full after:scale-100",
      )}
    >
      <Icons.Subtitle />
    </button>
  );
}

export function VideoSettings() {
  return (
    <button type="button" className="grid size-12 place-content-center">
      <Icons.Settings />
    </button>
  );
}

export function VideoVolume() {
  const { muted, volume, handleToggleMuted, handleVolumeChange } = useVideo();

  return (
    <div className="group/volume flex items-center">
      <button
        type="button"
        className="grid size-12 place-content-center"
        onClick={handleToggleMuted}
      >
        {muted ? (
          <Icons.VolumeX />
        ) : volume < 0.5 ? (
          <Icons.Volume1 />
        ) : (
          <Icons.Volume2 />
        )}
      </button>
      <Slider
        max={1}
        step={0.01}
        value={[muted ? 0 : volume]}
        onValueChange={([value]) => handleVolumeChange(value)}
        className="w-0 opacity-0 transition-all group-hover/volume:w-16 group-hover/volume:opacity-100"
      />
    </div>
  );
}

function formatTime(time: number) {
  const rawMinutes = Math.floor(time / 60);
  const rawSeconds = Math.floor(time % 60);

  if (Number.isNaN(rawMinutes) || Number.isNaN(rawSeconds)) {
    return "00:00";
  }

  const minutes = String(rawMinutes).padStart(2, "0");
  const seconds = String(rawSeconds).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

type DurationProps = React.ComponentPropsWithoutRef<"div">;

export function VideoDuration({ className, ...props }: DurationProps) {
  const { currentTime, duration } = useVideo();

  return (
    <div
      className={cn("flex cursor-text items-center gap-2 text-sm", className)}
      {...props}
    >
      <span>{formatTime(currentTime)}</span>
      <span>/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
}

type ProgressBarProps = React.ComponentPropsWithoutRef<typeof Slider>;

export function VideoProgressBar(props: ProgressBarProps) {
  const { currentTime, duration, handleTimeChange } = useVideo();

  return (
    <Slider
      max={duration}
      value={[currentTime]}
      onValueChange={([value]) => {
        handleTimeChange(value);
      }}
      step={0.1}
      {...props}
    />
  );
}

export function VideoFullscreen() {
  const { fullscreen, handleToggleFullscreen } = useVideo();

  return (
    <button
      type="button"
      className="grid size-12 place-content-center"
      onClick={handleToggleFullscreen}
    >
      {fullscreen ? <Icons.Minimize /> : <Icons.Maximize />}
    </button>
  );
}

export function VideoPictureInPicture() {
  const { pictureInPicture, handleTogglePictureInPicture } = useVideo();

  return (
    <button
      type="button"
      className="grid size-12 place-content-center"
      onClick={handleTogglePictureInPicture}
    >
      {pictureInPicture ? (
        <Icons.PictureInPicture />
      ) : (
        <Icons.PictureInPicture2 />
      )}
    </button>
  );
}

export const Video = Object.assign(VideoRoot, {
  Player: VideoPlayer,
  Bottom: VideoBottom,
  Controls: VideoControls,
  ControlsLeft: VideoControlsLeft,
  ControlsRight: VideoControlsRight,
  Play: VideoPlay,
  Next: VideoNext,
  Volume: VideoVolume,
  Duration: VideoDuration,
  Fullscreen: VideoFullscreen,
  ProgressBar: VideoProgressBar,
  PictureInPicture: VideoPictureInPicture,
  Subtitle: VideoSubtitle,
  Settings: VideoSettings,
});
