import type { Locale } from "@utaka/i18n/shared";

export const experiences = [
  {
    title: {
      en: "Front-End Developer",
      "pt-BR": "Desenvolvedor Front-End",
    },
    company: "Anjun Express",
    date: {
      en: "April 2023 - October 2023 · 7 mos",
      "pt-BR": "Abril de 2023 - Outubro de 2023 · 7 meses",
    },
    description: {
      en: "Develop and maintain internal systems to enhance cross-border transportation and logistics operations, following best development practices. Collaborate with product managers and designers to create user-friendly interfaces and improve user experience. Implement responsive designs using modern web technologies and frameworks. Write clean, maintainable code and conduct code reviews to ensure high code quality and performance.",
      "pt-BR":
        "Desenvolver e manter sistemas internos para aprimorar as operações de transporte e logística transfronteiriças, seguindo as melhores práticas de desenvolvimento. Colaborar com gerentes de produto e designers para criar interfaces fáceis de usar e melhorar a experiência do usuário. Implementar designs responsivos usando tecnologias e estruturas web modernas. Escreva limpo , código sustentável e realizar revisões de código para garantir alta qualidade e desempenho do código.",
    },
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
    title: {
      en: "Full-Stack Developer",
      "pt-BR": "Desenvolvedor Full-Stack",
    },
    company: "Divina Terra Atibaia",
    date: {
      en: "January 2023 - March 2023 · 3 mos",
      "pt-BR": "Janeiro de 2023 - Março de 2023 · 3 meses",
    },
    description: {
      en: "I architected a landing page using Astro and a admin dashboard using Next.js for a local healthy market in Atibaia, Brazil. The project was built using a monorepo structure with Turborepo. All API routes were fully type-safe using TRPC and the database was managed with Drizzle ORM. The project was deployed to Vercel and the client was very satisfied with the results.",
      "pt-BR":
        "Arquitetei uma landing page usando Astro e um painel de administração usando Next.js para um mercado local saudável em Atibaia, Brasil. O projeto foi construído usando uma estrutura monorepo com Turborepo. Todas as rotas de API eram totalmente seguras usando TRPC e o banco de dados foi gerenciado com Drizzle ORM. O projeto foi implantado na Vercel e o cliente ficou muito satisfeito com os resultados.",
    },
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
    title: {
      en: "Front-End Developer",
      "pt-BR": "Desenvolvedor Front-End",
    },
    company: "ONG CACV",
    date: {
      en: "April 2020 - June 2020 · 2 mos",
      "pt-BR": "Abril de 2020 - Junho de 2020 · 2 meses",
    },
    description: {
      en: "Developed a responsive web application for a local non-profit organization. Worked closely with the client to understand their needs and delivered a user-friendly website that met their requirements. Implemented a custom design using HTML, CSS, and JavaScript, and integrated a contact form for users to get in touch with the organization.",
      "pt-BR":
        "Desenvolvi um aplicativo web responsivo para uma organização local sem fins lucrativos. Trabalhei em estreita colaboração com o cliente para entender suas necessidades e entregar um site fácil de usar que atendesse aos seus requisitos. Implementei um design personalizado usando HTML, CSS e JavaScript e integrei um formulário de contato para os usuários entrarem em contato com a organização.",
    },
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
  },
] satisfies {
  title: Record<Locale, string>;
  company: string;
  date: Record<Locale, string>;
  description: Record<Locale, string>;
  skills: string[];
}[];

export type Experience = (typeof experiences)[number];
