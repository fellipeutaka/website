export const experiences = [
  {
    title: "Front-End Developer",
    company: "Blue Company",
    startedAt: new Date(2023, 8, 16),
    endedAt: null,
    description:
      "Develop and maintain web applications for a health tech company. Collaborate with product managers and designers to create user-friendly interfaces and improve user experience. Implement responsive designs using modern web technologies and frameworks. Write clean, maintainable code and conduct code reviews to ensure high code quality and performance.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Radix UI",
      "Tailwind CSS",
      "Agile Development",
      "Monday",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Anjun Express",
    startedAt: new Date(2023, 3, 1),
    endedAt: new Date(2023, 9, 1),
    description:
      "Develop and maintain internal systems to enhance cross-border transportation and logistics operations, following best development practices. Collaborate with product managers and designers to create user-friendly interfaces and improve user experience. Implement responsive designs using modern web technologies and frameworks. Write clean, maintainable code and conduct code reviews to ensure high code quality and performance.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "styled-components",
      "Tailwind CSS",
      "GraphQL",
      "Agile Development",
      "Trello",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Divina Terra Atibaia",
    startedAt: new Date(2023, 0, 1),
    endedAt: new Date(2023, 2, 1),
    description:
      "I architected a landing page using Astro and a admin dashboard using Next.js for a local healthy market in Atibaia, Brazil. The project was built using a monorepo structure with Turborepo. All API routes were fully type-safe using TRPC and the database was managed with Drizzle ORM. The project was deployed to Vercel and the client was very satisfied with the results.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Astro",
      "Tailwind CSS",
      "Recharts",
      "react-hook-form",
      "TRPC",
      "Drizzle ORM",
    ],
  },
  {
    title: "Front-End Developer",
    company: "ONG CACV",
    startedAt: new Date(2020, 4, 1),
    endedAt: new Date(2020, 6, 1),
    description:
      "Developed a responsive web application for a local non-profit organization. Worked closely with the client to understand their needs and delivered a user-friendly website that met their requirements. Implemented a custom design using HTML, CSS, and JavaScript, and integrated a contact form for users to get in touch with the organization.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
  },
] satisfies {
  title: string;
  company: string;
  startedAt: Date;
  endedAt: Date | null;
  description: string;
  skills: string[];
}[];

export type Experience = (typeof experiences)[number];
