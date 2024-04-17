import { Icons } from "@utaka/ui";

export const siteConfig = {
  name: "Fellipe Utaka",
  url: "https://fellipeutaka.vercel.app",
  description: "Fellipe Utaka's personal website",
  keywords:
    "Fellipe Utaka, Fellipe, Utaka, Software Engineer, Software Developer, Developer, Engineer, Frontend Engineer, Frontend Developer, Frontend, Front-end, Front end, Front, Frontend Development, Frontend Engineering, Frontend Developer",
  links: {
    twitter: "https://twitter.com/fellipeutaka",
    github: "https://github.com/fellipeutaka",
    linkedin: "https://www.linkedin.com/in/fellipeutaka",
    devTo: "https://dev.to/fellipeutaka",
    codepen: "https://codepen.io/fellipeutaka",
    contra:
      "https://contra.com/fellipeutaka?utm_campaign=HireMeOnContra&utm_medium=1c519af6-f220-41f2-9c11-4e491e48e3b2",
  },
};

export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#experience", label: "Experience" },
  { href: "/contributions", label: "Contributions" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks = [
  {
    label: "GitHub",
    icon: Icons.GitHub,
    href: siteConfig.links.github,
  },
  {
    label: "Twitter",
    icon: Icons.Twitter,
    href: siteConfig.links.twitter,
  },
  {
    label: "Dev.to",
    icon: Icons.Layers,
    href: siteConfig.links.devTo,
  },
  {
    label: "LinkedIn",
    icon: Icons.LinkedIn,
    href: siteConfig.links.linkedin,
  },
  {
    label: "Codepen",
    icon: Icons.Codepen,
    href: siteConfig.links.codepen,
  },
  {
    label: "Contra",
    icon: Icons.Contra,
    href: siteConfig.links.contra,
  },
];
