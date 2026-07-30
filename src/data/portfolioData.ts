import { Project, SkillCategory, TimelineItem, UserProfile, Testimonial } from '../types';

export const userProfile: UserProfile = {
  name: "Laye",
  title: "Développeur Web en Apprentissage",
  subtitle: "Jeune polyvalent & autodidacte",
  tagline: "Développement web, gestion de projets et innovation numérique.",
  location: "Dakar",
  country: "Sénégal 🇸🇳",
  avatar: "/src/assets/images/amadou_ka_photo.jpg.jpeg",
  bio: "Bonjour, je suis Amadou Ka, développeur web en apprentissage (1 an et quelques mois) basé à Dakar. Passionné d'innovation numérique, je conçois des solutions digitales concrètes et autonomes.",
  detailedBio: "Développeur web en apprentissage depuis 1 an et quelques mois, je maîtrise progressivement HTML, CSS, Tailwind CSS, Git, GitHub, JavaScript et les bases de React. Créateur autonome de la plateforme agricole KA-Farm (reliant la ferme au village et le suivi à distance en ville).",
  email: "amadoucoumbaka@gmail.com",
  phone: "+221 77 000 00 00",
  github: "https://github.com/Ahmad12-hu",
  linkedin: "https://www.linkedin.com/in/amadou-ka-a229b6267/",
  twitter: "https://twitter.com/amadou_ka",
  facebook: "https://facebook.com/amadou.ka",
  stats: {
    projectsCount: 1,
    studentsReached: 120,
    githubCommits: "500+",
    yearsLearning: "1 an+",
    experienceYears: "1 an+"
  }
};

export const projectsData: Project[] = [
  {
    id: "ka-farm",
    title: "KA-Farm (Agri-Tech SaaS)",
    tagline: "Plateforme SaaS agricole multi-utilisateurs interconnectant la ferme au village et le pilotage en ville",
    description: "Application de gestion agricole de pointe permettant la supervision à distance du bétail, des récoltes, du personnel et de la comptabilité.",
    fullDescription: "KA-Farm est une plateforme SaaS novatrice en cours de développement, conçue pour répondre aux réalités d'exploitation en Afrique de l'Ouest. Utilisable en mode Progressive Web App (PWA) hors-ligne et dotée d'un tableau de bord analytique complet, elle relie les opérations de terrain (au village) au suivi stratégique et financier (en ville).",
    category: "Agri-tech",
    tags: ["React", "TypeScript", "Node.js", "PWA", "Tailwind CSS"],
    highlights: [
      "Suivi opérationnel en temps réel entre le village et la ville",
      "Mode PWA résilient avec synchronisation hors-ligne",
      "Tableau de bord financier et de gestion des récoltes & élevage",
      "Interface bilingue et multi-exploitations"
    ],
    githubUrl: "https://github.com/Ahmad12-hu/ka-farm",
    demoUrl: "https://ka-farm.vercel.app",
    featured: true,
    image: "/src/assets/images/ka_farm_hero_1785154816687.jpg",
    interactiveType: "ka-farm",
    stats: [
      { label: "Usage", value: "Village & Ville" },
      { label: "Architecture", value: "PWA / SaaS" },
      { label: "Statut", value: "En développement" }
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Développement Web Frontend",
    skills: [
      { name: "HTML5", level: 90, iconName: "Code", description: "Structuration sémantique de pages web modernes et accessibles", badgeColor: "from-orange-500 to-amber-500" },
      { name: "CSS3", level: 88, iconName: "FileCode", description: "Mise en page réponsive, stylisation moderne et animations CSS", badgeColor: "from-blue-500 to-cyan-500" },
      { name: "Tailwind CSS", level: 90, iconName: "Palette", description: "Conception d'interfaces modernes, réponsives et utility-first", badgeColor: "from-teal-400 to-cyan-500" },
      { name: "JavaScript", level: 60, iconName: "Cpu", description: "En apprentissage actif : dynamisation des interfaces et logique web", badgeColor: "from-yellow-400 to-amber-500" },
      { name: "React", level: 35, iconName: "Atom", description: "Notions de base : découverte des composants, JSX et hooks fondamentaux", badgeColor: "from-cyan-400 to-blue-500" }
    ]
  },
  {
    name: "Versionnement & Outils de Travail",
    skills: [
      { name: "Git", level: 90, iconName: "GitBranch", description: "Maîtrise du contrôle de version, gestion des branches et historique de commits", badgeColor: "from-red-500 to-rose-600" },
      { name: "GitHub", level: 92, iconName: "Github", description: "Maîtrise de la gestion des dépôts distants, workflow collaboratif et publications", badgeColor: "from-slate-700 to-slate-900" }
    ]
  }
];

export const timelineData: TimelineItem[] = [
  {
    year: "2022 - PRÉSENT",
    role: "Chef de Projet Digital & Développeur Lead",
    institution: "Projets d'Innovation & SaaS",
    location: "Dakar, Sénégal",
    description: "Pilotage complet du cycle de vie des projets informatiques, de la définition des besoins fonctionnels à la mise en production.",
    highlights: [
      "Conception & déploiement de la plateforme SaaS KA-Farm",
      "Coordination des équipes techniques et des parties prenantes",
      "Mise en place de systèmes de suivi-évaluation des indicateurs d'impact"
    ],
    type: "project",
    icon: "Briefcase"
  },
  {
    year: "2020 - 2022",
    role: "Gestionnaire de Projets & Administrateur",
    institution: "Organisations & Projets de Développement",
    location: "Dakar, Sénégal",
    description: "Supervision administrative, suivi stratégique et gouvernance de projets d'inclusion et de développement durable.",
    highlights: [
      "Optimisation des circuits administratifs et de reporting",
      "Gestion des relations institutionnelles et partenariats",
      "Conduite du changement et digitalisation des processus"
    ],
    type: "community",
    icon: "CheckCircle2"
  },
  {
    year: "FORMATION",
    role: "Spécialisation Gestion de Projets & Génie Logiciel",
    institution: "Enseignement Supérieur & Certifications",
    location: "Sénégal",
    description: "Parcours pluridisciplinaire combinant administration des entreprises, management de projet et ingénierie logicielle.",
    highlights: [
      "Diplôme en Gestion & Administration des Projets",
      "Certifications en Développement Web & Mobile Full-Stack",
      "Formation continue en Systèmes d'Information & Gouvernance"
    ],
    type: "education",
    icon: "GraduationCap"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Ousmane Diallo",
    role: "Directeur des Opérations",
    company: "AgriTech Innovation Senegal",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "Amadou Ka allie à la perfection la rigueur administrative d'un gestionnaire de projet et la créativité d'un développeur full-stack. La plateforme KA-Farm en est la preuve vivante.",
    rating: 5
  },
  {
    id: "2",
    name: "Fatou Sow",
    role: "Consultante en Gouvernance",
    company: "DevConsulting Dakar",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    content: "Une capacité exceptionnelle d'analyse et de coordination. Amadou Ka apporte des solutions concrètes, sécurisées et orientées résultats qui transforment l'efficacité des équipes.",
    rating: 5
  },
  {
    id: "3",
    name: "Mamadou Ba",
    role: "Co-fondateur & Partenaire",
    company: "KA-Farm Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "Travailler avec Amadou Ka sur la digitalisation de nos opérations a été déterminant. Son professionnalisme, son autonomie et sa vision stratégique font la différence.",
    rating: 5
  }
];