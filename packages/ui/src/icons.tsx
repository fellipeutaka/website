export type IconProps = React.ComponentPropsWithoutRef<"svg">;
export type Icon = (props: IconProps) => React.ReactElement;

export const Icons = {
  Logo: (props) => (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask>
        <path fill="currentColor" d="M0 0H32V32H0z" />
      </mask>
      <path
        fill="currentColor"
        d="M13.2 23.5H9.5V6h11.6v3.1h-7.9v4.1h7.1v3.1h-7.1v7.2z"
      />
    </svg>
  ),
  Loader: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  ),
  LogOut: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <path d="M16 17L21 12 16 7" />
      <path d="M21 12L9 12" />
    </svg>
  ),
  X: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Menu: (props) => (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  Link: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  ExternalLink: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    </svg>
  ),
  Eye: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7" />
        <circle cx={12} cy={12} r={3} />
      </g>
    </svg>
  ),
  Download: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <path d="M7 10L12 15 17 10" />
      <path d="M12 15L12 3" />
    </svg>
  ),
  Circle: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  Copy: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Check: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  Settings: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  ),
  ArrowUp: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12l7-7 7 7M12 19V5" />
    </svg>
  ),
  ChevronRight: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  ChevronLast: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 18l6-6-6-6M17 6v12" />
    </svg>
  ),
  GraduationCap: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.42 10.922a1 1 0 00-.019-1.838L12.83 5.18a2 2 0 00-1.66 0L2.6 9.08a1 1 0 000 1.832l8.57 3.908a2 2 0 001.66 0zM22 10v6" />
      <path d="M6 12.5V16a6 3 0 0012 0v-3.5" />
    </svg>
  ),
  MapPin: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  ),
  Clock: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M12 6L12 12 16 14" />
    </svg>
  ),
  Play: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 3L20 12 6 21 6 3z" />
    </svg>
  ),
  Pause: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x={14} y={4} width={4} height={16} rx={1} />
      <rect x={6} y={4} width={4} height={16} rx={1} />
    </svg>
  ),
  Minimize: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3" />
    </svg>
  ),
  Maximize: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" />
    </svg>
  ),
  Subtitle: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width={18} height={14} x={3} y={5} rx={2} ry={2} />
      <path d="M7 15h4m4 0h2M7 11h2m4 0h4" />
    </svg>
  ),
  PictureInPicture: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 4.5v5H3m-1-6l6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3" />
      <rect width={10} height={7} x={12} y={13.5} ry={2} />
    </svg>
  ),
  PictureInPicture2: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 9V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10c0 1.1.9 2 2 2h4" />
      <rect width={10} height={7} x={12} y={13} rx={2} />
    </svg>
  ),
  VolumeX: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z" />
      <path d="M22 9L16 15" />
      <path d="M16 9L22 15" />
    </svg>
  ),
  Volume1: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  ),
  Volume2: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z" />
      <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  ),
  Zap: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14z" />
    </svg>
  ),
  Trash: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  File: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7z" />
      <path d="M14 2v4a2 2 0 002 2h4" />
    </svg>
  ),
  Folder: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
    </svg>
  ),
  FolderOpen: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 14l1.5-2.9A2 2 0 019.24 10H20a2 2 0 011.94 2.5l-1.54 6a2 2 0 01-1.95 1.5H4a2 2 0 01-2-2V5a2 2 0 012-2h3.9a2 2 0 011.69.9l.81 1.2a2 2 0 001.67.9H18a2 2 0 012 2v2" />
    </svg>
  ),
  Contra: (props) => (
    <svg fill="none" height={24} viewBox="0 0 60 60" width={24} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.883.56h-.678v27.255h27.238v-.836C46.493 23.65 36.288 13.485 32.883.56z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.765 27.256H58.33C46.124 23.764 36.495 14.303 32.765 2.178v25.078zm26.677 1.118H32.203a.559.559 0 01-.559-.56V.56c0-.309.25-.559.56-.559h.678a.56.56 0 01.54.417c3.363 12.765 13.386 22.736 26.16 26.02a.56.56 0 01.419.542v.836a.56.56 0 01-.56.559zm.002 4.49v-.679H32.205v27.256h.835c3.328-12.958 13.486-23.17 26.404-26.577z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.765 32.744v25.58a37.6 37.6 0 0125.063-25.58H32.765zM33.039 60h-.836a.559.559 0 01-.559-.56V32.185c0-.308.25-.558.56-.558h27.238a.56.56 0 01.559.558v.679a.56.56 0 01-.416.54A36.476 36.476 0 0033.58 59.58a.558.558 0 01-.541.42zm-5.919-.56h.68V32.186H.56v.836c12.95 3.33 23.155 13.493 26.56 26.42z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.666 32.744c12.207 3.492 21.836 12.953 25.566 25.078V32.744H1.666zM27.796 60h-.677a.56.56 0 01-.54-.417C23.216 46.817 13.192 36.847.419 33.563A.56.56 0 010 33.02v-.835a.56.56 0 01.559-.559h27.238c.308 0 .558.25.558.56V59.44c0 .31-.25.56-.558.56zM.56 27.136v.678H27.8V.56h-.836C23.636 13.517 13.479 23.729.56 27.136z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.179 27.255h25.062V1.674A37.602 37.602 0 012.179 27.255zm25.618 1.119H.559a.559.559 0 01-.559-.56v-.677c0-.255.17-.477.416-.54A36.477 36.477 0 0026.421.42a.56.56 0 01.54-.42h.836c.308 0 .558.25.558.56v27.255a.56.56 0 01-.558.559z"
        fill="currentColor"
      />
    </svg>
  ),
  Google: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81"
      />
    </svg>
  ),
  GitHub: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  LinkedIn: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <path d="M2 9H6V21H2z" />
      <circle cx={4} cy={4} r={2} />
    </svg>
  ),
  Twitter: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  Codepen: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2z" />
      <path d="M12 22L12 15.5" />
      <path d="M22 8.5L12 15.5 2 8.5" />
      <path d="M2 15.5L12 8.5 22 15.5" />
      <path d="M12 2L12 8.5" />
    </svg>
  ),
  Layers: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.83 2.18a2 2 0 00-1.66 0L2.6 6.08a1 1 0 000 1.83l8.58 3.91a2 2 0 001.66 0l8.58-3.9a1 1 0 000-1.83zM22 17.65l-9.17 4.16a2 2 0 01-1.66 0L2 17.65M22 12.65l-9.17 4.16a2 2 0 01-1.66 0L2 12.65" />
    </svg>
  ),
  Php: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <defs>
        <radialGradient
          id="a"
          cx={-16.114}
          cy={20.532}
          r={18.384}
          gradientTransform="translate(26.52 -9.307)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#fff" />
          <stop offset={0.5} stopColor="#4c6b96" />
          <stop offset={1} stopColor="#231f20" />
        </radialGradient>
      </defs>
      <ellipse cx={16} cy={16} fill="url(#a)" rx={14} ry={7.365} />
      <ellipse cx={16} cy={16} fill="#6280b6" rx={13.453} ry={6.818} />
      <path
        fill="#fff"
        d="M18.725 18.2l.667-3.434a1.752 1.752 0 00-.372-1.719 2.929 2.929 0 00-2-.525h-1.153l.331-1.7a.219.219 0 00-.215-.26h-1.6a.219.219 0 00-.215.177l-.709 3.646a2.051 2.051 0 00-.477-1.054 2.783 2.783 0 00-2.2-.807H7.7a.219.219 0 00-.215.177l-1.434 7.38a.219.219 0 00.215.26h1.603a.219.219 0 00.215-.177l.347-1.785h1.2a5.167 5.167 0 001.568-.2 3.068 3.068 0 001.15-.689 3.538 3.538 0 00.68-.844l-.287 1.475a.219.219 0 00.215.26h1.6a.219.219 0 00.215-.177l.787-4.051h1.094c.466 0 .6.093.64.133s.1.165.025.569l-.635 3.265a.219.219 0 00.215.26h1.62a.219.219 0 00.207-.18m-7.395-2.834a1.749 1.749 0 01-.561 1.092 2.171 2.171 0 01-1.315.321h-.712l.515-2.651h.921c.677 0 .949.145 1.059.266a1.181 1.181 0 01.093.972m14.216-2.034a2.783 2.783 0 00-2.2-.807h-3.091a.219.219 0 00-.215.177l-1.434 7.38a.219.219 0 00.215.26h1.608a.219.219 0 00.215-.177l.347-1.785h1.2a5.167 5.167 0 001.568-.2 3.068 3.068 0 001.15-.689 3.425 3.425 0 001.076-1.927 2.512 2.512 0 00-.439-2.232m-1.667 2.034a1.749 1.749 0 01-.561 1.092 2.171 2.171 0 01-1.318.32h-.71l.515-2.651h.921c.677 0 .949.145 1.059.266a1.181 1.181 0 01.094.973"
      />
      <path
        fill="#000004"
        d="M10.178 13.908a1.645 1.645 0 011.221.338 1.34 1.34 0 01.145 1.161 1.945 1.945 0 01-.642 1.223 2.361 2.361 0 01-1.448.37h-.978l.6-3.089zm-3.917 6.216h1.608l.381-1.962h1.377a4.931 4.931 0 001.5-.191 2.84 2.84 0 001.07-.642 3.207 3.207 0 001.01-1.808 2.3 2.3 0 00-.385-2.044 2.568 2.568 0 00-2.035-.732H7.7zm8.126-9.342h1.6l-.387 1.962h1.421a2.767 2.767 0 011.85.468 1.548 1.548 0 01.305 1.516l-.667 3.434H16.89l.635-3.265a.886.886 0 00-.08-.76 1.121 1.121 0 00-.8-.2H15.37l-.822 4.228h-1.6zm8.34 3.126a1.645 1.645 0 011.221.338 1.34 1.34 0 01.145 1.161 1.945 1.945 0 01-.642 1.223A2.361 2.361 0 0122 17h-.978l.6-3.089zm-3.917 6.216h1.608l.381-1.962h1.377a4.931 4.931 0 001.5-.191 2.84 2.84 0 001.07-.642 3.207 3.207 0 001.01-1.808 2.3 2.3 0 00-.385-2.044 2.568 2.568 0 00-2.035-.732h-3.092z"
      />
    </svg>
  ),
  React: (props) => (
    <svg viewBox="0 0 128 128" fill="#149eca" {...props}>
      <circle cx="64" cy="64" r="11.4" />
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
    </svg>
  ),
  ReactNative: (props) => (
    <svg viewBox="0 0 128 128" fill="#61DAFB" {...props}>
      <circle cx="64" cy="64" r="11.4" />
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
    </svg>
  ),
  Expo: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77z"
      />
    </svg>
  ),
  NextJS: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 128 128"
      {...props}
    >
      <circle cx={64} cy={64} r={64} />
      <path
        fill="url(#next_gradient)"
        d="M106.317 112.014L49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 006.763-5.209"
      />
      <path fill="url(#next_gradient2)" d="M81.778 38.4h8.533v51.2h-8.533z" />
      <defs>
        <linearGradient
          id="next_gradient"
          x1={109}
          x2={144.5}
          y1={116.5}
          y2={160.5}
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="next_gradient2"
          x1={121}
          x2={120.799}
          y1={54}
          y2={106.875}
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  ),
  JavaScript: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 128 128"
      {...props}
    >
      <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
      <path
        fill="#323330"
        d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581M69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237"
      />
    </svg>
  ),
  TypeScript: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 128 128"
      {...props}
    >
      <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" />
      <path
        fill="#007acc"
        d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
      />
    </svg>
  ),
  Node: (props) => (
    <svg viewBox="0 0 128 128" {...props}>
      <path
        fill="#83CD29"
        d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
      />
    </svg>
  ),
  Electron: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 128 128"
      {...props}
    >
      <g fill="#47848f">
        <path d="M49.07 32.66c-14.37-2.62-25.72.12-30.25 8-3.38 5.85-2.41 13.61 2.34 21.9a1.47 1.47 0 002.56-1.47c-4.28-7.47-5.12-14.17-2.35-19 3.76-6.51 13.89-9 27.17-6.54a1.47 1.47 0 10.53-2.9zM28.63 72.61a92.2 92.2 0 0022 17.34c20.84 12 43 15.25 54 7.79a1.47 1.47 0 00-1.66-2.43C93.11 102 72 98.92 52.07 87.39a89.27 89.27 0 01-21.26-16.77 1.47 1.47 0 00-2.18 2z" />
        <path d="M101.06 70.81c9.41-11.11 12.69-22.29 8.17-30.11-3.32-5.76-10.35-8.8-19.69-8.92a1.47 1.47 0 000 2.95c8.4.11 14.45 2.73 17.18 7.45 3.75 6.5.82 16.47-7.87 26.74a1.47 1.47 0 102.25 1.9zM76.89 33.15a92 92 0 00-26.25 10.4C29.13 56 15.09 74.29 17 87.57a1.47 1.47 0 003-.43C18.23 75.35 31.53 58 52.11 46.11A89.07 89.07 0 0177.51 36a1.47 1.47 0 10-.62-2.88z" />
        <path d="M42 96.78C47 110.51 55 119 64.05 119c6.6 0 12.7-4.5 17.46-12.42A1.47 1.47 0 1079 105c-4.28 7.12-9.53 11-14.94 11-7.52 0-14.69-7.54-19.24-20.24a1.47 1.47 0 00-2.77 1zm45-2.69a92.5 92.5 0 003.91-27.3c0-24.41-8.54-45.44-20.71-50.85a1.47 1.47 0 00-1.2 2.7c10.85 4.82 19 24.78 19 48.15a89.57 89.57 0 01-3.78 26.42 1.47 1.47 0 002.81.88zm27.71-1.44a7.05 7.05 0 10-7.05 7.05 7.05 7.05 0 007.05-7.05m-2.95 0a4.1 4.1 0 11-4.1-4.1 4.1 4.1 0 014.1 4.1M20.34 99.7a7.05 7.05 0 10-7.05-7.05 7.05 7.05 0 007.05 7.05m0-2.95a4.1 4.1 0 114.1-4.1 4.1 4.1 0 01-4.1 4.1" />
        <path d="M64.05 23.13A7.05 7.05 0 1057 16.08a7.05 7.05 0 007.05 7.05m0-2.95a4.1 4.1 0 114.1-4.1 4.1 4.1 0 01-4.1 4.1m1.08 51.59A5.1 5.1 0 1169 65.71a5.1 5.1 0 01-3.87 6.06" />
      </g>
    </svg>
  ),
  TailwindCSS: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 128 128"
      {...props}
    >
      <path
        fill="#38bdf8"
        d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0"
      />
    </svg>
  ),
  Turborepo: (props) => (
    <svg
      fill="none"
      height={32}
      viewBox="0 0 32 32"
      width={32}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="c"
          x1={15.0234}
          x2={3.64419}
          y1={4.00556}
          y2={15.3847}
        >
          <stop stopColor="#0096FF" />
          <stop offset={1} stopColor="#FF1E56" />
        </linearGradient>
        <linearGradient id="a">
          <stop offset="0%" />
          <stop offset="25%" stopColor="#fff" />
          <stop offset="85%" stopColor="#fff" />
          <stop offset="100%" />
        </linearGradient>
        <mask id="b">
          <path fill="url(#a)" transform="translate(-8)" d="M0 0H46V26H0z" />
        </mask>
      </defs>
      <g mask="url(#b)">
        <path
          className="fill-black dark:fill-white"
          d="M13.94 6.422c-4.146 0-7.518 3.372-7.518 7.518 0 4.145 3.372 7.518 7.518 7.518 4.145 0 7.518-3.373 7.518-7.518 0-4.146-3.373-7.518-7.518-7.518zm0 11.408a3.89 3.89 0 11-.001-7.78 3.89 3.89 0 010 7.78z"
        />
        <path
          clipRule="evenodd"
          d="M14.57 5.187V2.38c6.1.326 10.948 5.377 10.948 11.56 0 6.182-4.847 11.232-10.948 11.56v-2.807c4.547-.325 8.148-4.125 8.148-8.753 0-4.629-3.601-8.428-8.148-8.753zM7.31 19.68a8.741 8.741 0 01-2.122-5.11H2.38a11.528 11.528 0 002.941 7.096l1.987-1.986h.001zm6 5.82v-2.807a8.733 8.733 0 01-5.112-2.121l-1.986 1.986a11.527 11.527 0 007.096 2.942h.002z"
          fill="url(#c)"
          fillRule="evenodd"
        />
      </g>
    </svg>
  ),
  Md: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41M6.81 15.19v-3.66l1.92 2.35 1.92-2.35v3.66h1.93V8.81h-1.93l-1.92 2.35-1.92-2.35H4.89v6.38zM19.69 12h-1.92V8.81h-1.92V12h-1.93l2.89 3.28z"
      />
    </svg>
  ),
  Mdx: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20.3 16.5l-3.9 3.9-4-3.9 1.1-1.1 2.1 2.1v-5.7h1.5v5.8l2.1-2.1zm-16.8-.8l2.7 2.7L9 15.7v4.4h1.5V12l-4.3 4.3L2 12v8.1h1.5z"
      />
      <path
        fill="#f9ac00"
        d="M28.8 20l-3.1-3.1-3.1 3.1-1-1.1 3.1-3.1-3.2-3.2 1.1-1 3.1 3.2 3.2-3.2 1.1 1-3.2 3.2 3.1 3.1z"
      />
    </svg>
  ),
  Terminal: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 17L10 11 4 5" />
      <path d="M12 19L20 19" />
    </svg>
  ),
  Npm: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#cb3837"
        d="M2 10.555h28v9.335H16v1.556H9.778v-1.557H2zm1.556 7.779h3.111v-4.668h1.555v4.667h1.556v-6.222H3.556zm7.778-6.223v7.779h3.111v-1.556h3.111v-6.223zm3.111 1.556H16v3.112h-1.556zm4.667-1.556v6.223h3.111v-4.668h1.556v4.667h1.556v-4.667h1.556v4.667h1.556v-6.222z"
      />
    </svg>
  ),
  Yarn: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#2188b6"
        d="M28.208 24.409a10.493 10.493 0 00-3.959 1.822 23.743 23.743 0 01-5.835 2.642 1.632 1.632 0 01-.983.55 62.228 62.228 0 01-6.447.577c-1.163.009-1.876-.3-2.074-.776a1.573 1.573 0 01.866-2.074 3.759 3.759 0 01-.514-.379c-.171-.171-.352-.514-.406-.388-.225.55-.343 1.894-.947 2.5-.83.839-2.4.559-3.328.072-1.019-.541.072-1.813.072-1.813a.73.73 0 01-.992-.343 4.847 4.847 0 01-.667-2.949 5.374 5.374 0 011.749-2.895 9.334 9.334 0 01.658-4.4 10.445 10.445 0 013.165-3.661S6.628 10.747 7.35 8.817c.469-1.262.658-1.253.812-1.308a3.633 3.633 0 001.452-.857 5.265 5.265 0 014.41-1.7S15.2 1.4 16.277 2.09a18.349 18.349 0 011.533 2.886s1.281-.748 1.425-.469a11.334 11.334 0 01.523 6.132 14.01 14.01 0 01-2.6 5.411c-.135.225 1.551.938 2.615 3.887.983 2.7.108 4.96.262 5.212.027.045.036.063.036.063s1.127.09 3.391-1.308a8.5 8.5 0 014.277-1.604 1.081 1.081 0 01.469 2.11z"
      />
    </svg>
  ),
  Pnpm: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#f9ad00"
        d="M30 10.75h-8.749V2H30zm-9.626 0h-8.75V2h8.75zm-9.625 0H2V2h8.749zM30 20.375h-8.749v-8.75H30z"
      />
      <path
        fill="#4e4e4e"
        d="M20.374 20.375h-8.75v-8.75h8.75zm0 9.625h-8.75v-8.75h8.75zM30 30h-8.749v-8.75H30zm-19.251 0H2v-8.75h8.749z"
      />
    </svg>
  ),
  Bun: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#fbf0df"
        d="M29 17c0 5.65-5.82 10.23-13 10.23S3 22.61 3 17c0-3.5 2.24-6.6 5.66-8.44S14.21 4.81 16 4.81s3.32 1.54 7.34 3.71C26.76 10.36 29 13.46 29 17"
      />
      <path
        fill="none"
        stroke="#000"
        d="M16 27.65c7.32 0 13.46-4.65 13.46-10.65 0-3.72-2.37-7-5.89-8.85-1.39-.75-2.46-1.41-3.37-2l-1.13-.69A6.14 6.14 0 0016 4.35a6.88 6.88 0 00-3.3 1.23c-.42.24-.86.51-1.32.8-.87.54-1.83 1.13-3 1.73C4.91 10 2.54 13.24 2.54 17c0 6 6.14 10.65 13.46 10.65z"
      />
      <ellipse cx={21.65} cy={18.62} fill="#febbd0" rx={2.17} ry={1.28} />
      <ellipse cx={10.41} cy={18.62} fill="#febbd0" rx={2.17} ry={1.28} />
      <path
        fillRule="evenodd"
        d="M11.43 18.11a2 2 0 10-2-2.05 2.05 2.05 0 002 2.05m9.2 0a2 2 0 10-2-2.05 2 2 0 002 2.05"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M10.79 16.19a.77.77 0 10-.76-.77.76.76 0 00.76.77m9.2 0a.77.77 0 100-1.53.77.77 0 000 1.53"
      />
      <path
        fill="#b71422"
        stroke="#000"
        strokeWidth={0.75}
        d="M18.62 19.67a3.3 3.3 0 01-1.09 1.75 2.48 2.48 0 01-1.5.69 2.53 2.53 0 01-1.5-.69 3.28 3.28 0 01-1.08-1.75.26.26 0 01.29-.3h4.58a.27.27 0 01.3.3z"
      />
      <path
        fill="#ccbea7"
        fillRule="evenodd"
        d="M14.93 5.75a6.09 6.09 0 01-2.09 4.62c-.1.09 0 .27.11.22 1.25-.49 2.94-1.94 2.23-4.88-.03-.15-.25-.11-.25.04m.85 0a6 6 0 01.57 5c0 .13.12.24.21.13.83-1 1.54-3.11-.59-5.31-.1-.11-.27.04-.19.17zm1-.06a6.09 6.09 0 012.53 4.38c0 .14.21.17.24 0 .34-1.3.15-3.51-2.66-4.66-.12-.02-.21.18-.09.27zM9.94 9.55a6.27 6.27 0 003.89-3.33c.07-.13.28-.08.25.07-.64 3-2.79 3.59-4.13 3.51-.14-.01-.14-.21-.01-.25"
      />
    </svg>
  ),
} satisfies Record<string, Icon>;