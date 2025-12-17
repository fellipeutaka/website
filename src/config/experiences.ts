export const experiences = [
  {
    title: "Full-Stack Engineer",
    company: "HP via Wipro Consultancy",
    startedAt: new Date(2025, 7, 1),
    endedAt: null,
    description:
      "Develop enterprise-scale developer platforms and AI-integrated backend services for HP's Internal Platform (HPIP). Design and implement a Backstage-based service catalog and developer portal with custom backend plugins, REST APIs, hierarchical entity modeling, and real-time GitHub webhook processing. Increase automated test coverage from 47% to 86%, improving code reliability, maintainability, and confidence in large-scale refactors. Develop a Go-based MCP server enabling secure AI access to internal catalogs and documentation, integrating OAuth 2.1 (PKCE), JWT validation, Redis sessions, and Kubernetes deployments. Work across Node.js, TypeScript, Go, React, PostgreSQL, Docker, and cloud-native infrastructure, collaborating with global teams.",
    skills: [
      "TypeScript",
      "Go",
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Backstage",
      "MCP",
      "OAuth 2.1",
      "JWT",
      "Redis",
      "GitHub Webhooks",
      "REST APIs",
      "Agile Development",
    ],
  },
  {
    title: "Front-End Developer",
    company: "Blue Company",
    startedAt: new Date(2024, 8, 1),
    endedAt: new Date(2025, 7, 1),
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
    title: "Freelance Full-Stack Developer",
    company: "Divina Terra Atibaia",
    startedAt: new Date(2024, 5, 1),
    endedAt: new Date(2024, 8, 1),
    description:
      "Built and deployed an admin dashboard with React, TypeScript, TailwindCSS, Next.js, and React Aria, reducing operational overhead by 15%. Developed the back-end using Java, Spring Boot, Postgres, Docker, CI/CD pipelines, and GitHub Actions, enhancing deployment efficiency. Delivered a responsive landing page using Astro and TailwindCSS, increasing mobile user engagement by 10%.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Astro",
      "Tailwind CSS",
      "React Aria",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "NextBase",
    startedAt: new Date(2024, 0, 1),
    endedAt: new Date(2024, 5, 1),
    description:
      "Engineered a modular SaaS boilerplate using React, TypeScript, TailwindCSS, Next.js, shadcn/ui, Supabase, and MDX, accelerating development cycles by 30%. Designed a scalable and reusable architecture to streamline future SaaS product development, enhancing team productivity.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "MDX",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Anjun Express",
    startedAt: new Date(2023, 3, 1),
    endedAt: new Date(2023, 9, 1),
    description:
      "Spearheaded the development and maintenance of internal systems to enhance transport and logistics operations, adhering to best practices. Optimized critical resources, resulting in a 20% increase in page loading speed. Established a comprehensive Design System with reusable and accessible components, published in NPM for broader adoption. Collaborated in English with international teams to integrate front and back-end solutions seamlessly.",
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
