// All personal content in one place. Edit freely.

export const profile = {
  name: "Neema Rhonnah Mkenda",
  shortName: "Neema Mkenda",
  role: "Full Stack Developer",
  location: "Nairobi, Kenya",
  location2: "Dar es Salaam, Tanzania",
  // Split so the address never appears as plain text in the page HTML (spam scrapers);
  // the browser joins it when someone opens the page.
  email: { user: "nmkenda98", domain: "gmail.com" },
  phone: "+254 796 403 061",
  phoneDigits: "254796403061",
  availability: "Available for new roles and freelance work",
  links: {
    // TODO: fill these in
    github: "https://github.com/neemarhonnahmkenda",
    linkedin: "https://www.linkedin.com/in/neema-mkenda-bb52b4200/",
    behance: "https://www.behance.net/neemarhonnahmkenda",
    medium: "https://medium.com/@rhonnahmkenda",
    // Optional: paste a profile URL to show it on the site and in search data. Leave "" to hide.
    x: "",
    instagram: "",
    youtube: "",
    facebook: "",
  },
  intro:
    "I design and build responsive web applications end to end, from Figma prototypes to Supabase-backed production apps.",
  about: [
    "Full Stack Developer with 3+ years of experience designing, developing, testing and maintaining web applications and digital platforms.",
    "I work mostly in JavaScript and TypeScript with React, Next.js and Vue on the front end, and Node.js, Python and Supabase/PostgreSQL behind it. I care about reusable components, sound authentication and access control, and interfaces that real users find easy.",
    "My UI/UX background means I am comfortable owning a feature from stakeholder requirements, through prototype and usability testing, to deployment.",
  ],
};

/** What I offer. Shown in the "What I do" section; also gives search engines more to read. */
export const services: { title: string; body: string; points: string[] }[] = [
  {
    title: "Full stack web applications",
    body:
      "I build web applications from the database to the interface: data models, REST APIs, authentication and access control, and responsive React, Next.js or Vue front ends that work on any phone or laptop.",
    points: ["Next.js and React apps", "Node.js, Python and Django back ends", "Supabase and PostgreSQL", "Deployment on Vercel"],
  },
  {
    title: "UI/UX design and usability testing",
    body:
      "Before writing code I turn stakeholder requirements into Figma prototypes, then test them with real users. At EA Eye, usability fixes from this process cut support tickets by 30%.",
    points: ["Figma prototypes", "Usability testing and UAT", "Design systems and reusable components", "Accessible, mobile-first layouts"],
  },
  {
    title: "Website support, SEO and performance",
    body:
      "I keep live websites healthy: fixing bugs, updating content and layouts, improving page speed and search visibility, and supporting eCommerce and WordPress sites for businesses.",
    points: ["eCommerce and WordPress", "Technical SEO", "Performance tuning", "Cross-browser testing"],
  },
];

/** How a project with me usually runs. */
export const workSteps = [
  { step: "Understand", body: "We agree on the goal, the users and what success looks like." },
  { step: "Design", body: "I sketch flows and a Figma prototype you can click through and comment on." },
  { step: "Build", body: "I ship in small, tested pieces so you see progress every week." },
  { step: "Launch and support", body: "I deploy, measure, and keep improving after launch." },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Advance Services",
    title: "Web Support Executive",
    period: "Jun 2025 – Present",
    points: [
      "Maintain and improve eCommerce websites: frontend, content and layout updates.",
      "Troubleshoot functionality and frontend issues to improve reliability and usability.",
      "Support SEO, responsive design and performance improvements across platforms.",
    ],
  },
  {
    company: "RCRO",
    title: "IT Specialist",
    period: "Oct 2024 – Present",
    points: [
      "Designed and developed a responsive healthcare web platform, covering frontend and backend integration.",
      "Integrated application interfaces with backend services and managed deployment configuration.",
      "Gathered stakeholder requirements and turned feedback into application improvements.",
    ],
  },
  {
    company: "EA Eye",
    title: "Lead Software Engineer & UI/UX Designer",
    period: "Oct 2023 – Jan 2026",
    points: [
      "Led frontend development and UI/UX implementation for a production web application.",
      "Ran usability testing and shipped improvements that reduced support tickets by 30%.",
      "Translated stakeholder requirements and prototypes into responsive interfaces.",
    ],
  },
  {
    company: "Global Spark",
    title: "Software Engineer",
    period: "May 2024 – May 2025",
    points: [
      "Built reusable React components from product specs and UI/UX designs.",
      "Frontend testing, debugging and performance optimisation in an agile team.",
    ],
  },
  {
    company: "Batian Consulting",
    title: "Freelance Web Developer",
    period: "Jun 2024 – Jul 2025",
    points: [
      "Developed and maintained WordPress components, layouts and responsive interfaces.",
      "Cross-browser testing, deployment, maintenance and client training.",
    ],
  },
  {
    company: "Diamond Trust Bank",
    title: "Job Shadow Trainee",
    period: "Aug 2023 – Sep 2023",
    points: [
      "Supported UAT for digital banking tools and turned issues into actionable design feedback.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind", "HTML & CSS"],
  },
  {
    group: "Backend & data",
    items: ["Node.js", "Python", "Django", "REST APIs", "Supabase", "PostgreSQL"],
  },
  {
    group: "Design & delivery",
    items: ["Figma", "UAT", "Usability testing", "Technical documentation", "GitHub"],
  },
];

export const education = {
  degree: "BSc Applied Computer Technology",
  school: "United States International University – Africa",
  period: "2021 – 2024",
  note: "CGPA 3.50 / 4.00",
};

export const certifications = [
  { name: "Women Techsters Bootcamp: Product Design", issuer: "Tech4Dev" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp" },
  { name: "Introduction to Python Programming", issuer: "Dataquest" },
  { name: "Python Fundamentals of Web Development", issuer: "Dataquest" },
];
