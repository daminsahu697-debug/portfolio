// ============================================================
// PORTFOLIO DATA — Centralized configuration & content
// ============================================================

export const personalInfo = {
  name: "Damin Sahu",
  initials: "DS",
  headline: "Building Practical Software Solutions Across Web, AI & IoT",
  positioning: "Software Development | Full-Stack, AI & IoT Projects",
  bio: "I'm Damin Sahu, a Computer Science and Engineering student interested in software development, full-stack applications, artificial intelligence, and IoT. I enjoy turning ideas into functional prototypes and solving practical technical problems.",
  role: "Software Development | Full-Stack, AI & IoT Projects",
  college: "NXTWAVE of Innovation in Advance Technology",
  degree: "B.Tech in Computer Science and Engineering",
  location: "Jaipur, Rajasthan, India",
  availabilityStatus: "Open to software engineering opportunities & hackathons",

  // ---- Verified Contact Information ----
  phone: "9302227322",
  email: "daminsahu697@gmail.com",
  github: "https://github.com/daminsahu697-debug",
  linkedin: "https://www.linkedin.com/in/damin-sahu/",
  profileImage: "/images/profile.jpg",
  resumeUrl: "/resume.pdf",

  heroRoles: [
    "Software Development Enthusiast",
    "Full-Stack Web Builder",
    "AI & Computer Vision Explorer",
    "IoT Systems Developer",
  ],

  aboutBlocks: [
    {
      icon: "BookOpen",
      label: "What I'm Learning",
      text: "Advanced DSA, system design concepts, and practical software engineering.",
    },
    {
      icon: "Wrench",
      label: "What I'm Building",
      text: "Full-stack web applications, IoT automation systems, and secure document platforms.",
    },
    {
      icon: "Sparkles",
      label: "What Interests Me",
      text: "Generative AI, computer vision, smart hardware prototyping, and hackathons.",
    },
  ],
};

// ---- Education ----
export interface AcademicHighlights {
  coursework?: string[];                // Optional coursework list
  technicalProjects?: string[];         // College/portfolio technical projects
  hackathonsAndCompetitions?: string[]; // Hackathons & coding competitions
  awards?: string[];                    // College-level awards and achievements
  certifications?: string[];            // Technical certifications
}

export interface EducationEntry {
  id: string;
  degree: string;                       // e.g. "B.Tech — Computer Science and Engineering"
  branch?: string;                      // e.g. "Computer Science and Engineering"
  institution?: string;                 // Institution name
  location?: string;                    // Location
  status: "Currently pursuing" | "Completed" | "Discontinued";
  currentYearOrSemester?: string;       // e.g. "2nd year"
  startYear?: string;                   // "2025"
  expectedGraduationYear?: string;      // "2029"
  cgpa?: string;                        // "9.33" or percentage
  academicFocus?: string[];             // Academic subjects/areas of learning
  academicHighlights?: AcademicHighlights;
  isCurrent?: boolean;                  // Primary/current education entry
}

export const education: EducationEntry[] = [
  {
    id: "btech-cse",
    degree: "B.Tech — Computer Science and Engineering",
    branch: "Computer Science and Engineering",
    institution: "NXTWAVE of Innovation in Advance Technology",
    location: "Jaipur, Rajasthan",
    status: "Currently pursuing",
    currentYearOrSemester: "2nd year",
    startYear: "2025",
    expectedGraduationYear: "2029",
    cgpa: "9.33",
    academicFocus: [
      "Programming and problem-solving",
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Web Development",
      "Operating Systems",
      "Artificial Intelligence and emerging technologies",
    ],
    academicHighlights: {
      technicalProjects: [
        "SecureChain DMS (Document Security & Workflow Developer)",
        "IoT Smart Waste Management System (Prototype)",
        "Personal Portfolio Website (Frontend Developer)",
      ],
      hackathonsAndCompetitions: [
        "UIDAI Hackathon 2026 — Team TatvX (Participant)",
      ],
      awards: [
        "First Prize — Badminton, NIAT sports event (2026)",
      ],
    },
    isCurrent: true,
  },
  {
    id: "class-12",
    degree: "Class XII",
    status: "Completed",
    cgpa: "82.8%",
  },
  {
    id: "class-10",
    degree: "Class X",
    status: "Completed",
    cgpa: "97%",
  },
];

// ---- Skills ----
export const skillGroups = [
  {
    label: "Programming",
    icon: "Code2",
    skills: ["C++", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Web Development",
    icon: "Globe",
    skills: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
  {
    label: "AI & Computer Vision",
    icon: "Brain",
    skills: ["OpenCV", "TensorFlow"],
  },
  {
    label: "IoT & Hardware",
    icon: "Cpu",
    skills: ["ESP32", "Arduino IDE", "Sensors"],
  },
  {
    label: "Backend & Data",
    icon: "Database",
    skills: ["Firebase", "PostgreSQL", "MinIO"],
  },
  {
    label: "Tools & Concepts",
    icon: "Binary",
    skills: [
      "Git",
      "GitHub",
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
    ],
  },
];

// ---- Projects ----
export type ProjectStatus = "Completed" | "In Progress" | "Prototype";
export type ProjectCategory = "All" | "Web / Software" | "AI / IoT";

export interface Project {
  id: string;
  title: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  contribution: string;
  technologies: string[];
  category: Exclude<ProjectCategory, "All">;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  imageAlt?: string;
}

export const projects: Project[] = [
  {
    id: "securechain-dms",
    title: "SecureChain DMS",
    role: "Document Security & Workflow Developer",
    shortDescription:
      "A secure document management system featuring document fingerprinting, access control, audit logging, and an approval-based editing workflow.",
    fullDescription:
      "Developed the concept and workflow for managing legal and investigation documents with file storage separated from document metadata. Planned SHA-256 fingerprints to support document-integrity verification. Designed an approval-based editing workflow intended to protect original documents and track changes.",
    problem:
      "Legal and investigation environments demand strict tamper resistance and auditability. Traditional storage lacks cryptographic file verification and segregated metadata controls.",
    solution:
      "Separated file object storage (MinIO) from relational metadata (PostgreSQL), planned SHA-256 integrity fingerprints, and designed a multi-step approval workflow for all proposed document updates.",
    contribution:
      "Architected the document isolation pipeline, designed role-based access models, and established the approval lifecycle.",
    technologies: [
      "MinIO",
      "PostgreSQL",
      "SHA-256",
      "OCR/NLP",
      "Role-Based Access Control",
      "Audit Logging",
    ],
    category: "Web / Software",
    status: "In Progress",
    githubUrl: "https://github.com/daminsahu697-debug/Secure_chain_dms",
    imageAlt: "SecureChain DMS architecture diagram",
  },
  {
    id: "iot-waste-management",
    title: "IoT Smart Waste Management System",
    role: "IoT & Computer Vision Developer",
    shortDescription:
      "An IoT-based project designed to monitor waste-bin fill levels and support smarter waste collection using sensors, a microcontroller, and connected software.",
    fullDescription:
      "Designed a prototype approach for monitoring bin fill levels using ultrasonic sensors. Explored sensor-based waste identification and sorting workflows. Planned Firebase-based data flow and camera-based computer vision for monitoring.",
    problem:
      "Fixed-schedule waste collection leads to overflowing containers and inefficient transit routing without real-time capacity insight.",
    solution:
      "Employed ultrasonic sensors with ESP32 microcontrollers for real-time fill tracking. Planned sensor-based sorting workflows with moisture/metal detection and computer vision classification.",
    contribution:
      "Built and calibrated the ultrasonic sensor prototype, established the microcontroller circuit, and drafted the telemetry pipeline.",
    technologies: [
      "ESP32 / Arduino",
      "Ultrasonic Sensors",
      "Moisture & Metal Sensors",
      "Firebase",
      "Computer Vision",
    ],
    category: "AI / IoT",
    status: "Prototype",
    imageAlt: "IoT Smart Waste Management System prototype node",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    role: "Frontend Developer",
    shortDescription:
      "Presents my professional introduction, education, skills, projects, achievements, and contact details with functional resume viewing and downloading.",
    fullDescription:
      "Presents my professional introduction, education, skills, projects, achievements, and contact details. Focuses on responsive layouts, clear navigation, and a polished user experience. Includes functional resume viewing and downloading.",
    problem:
      "Recruiters, hackathon judges, and collaborators need a fast, accessible, responsive, and genuine platform to review projects, credentials, and contact details.",
    solution:
      "Built a single-page responsive web portfolio with TypeScript, React, and Vite, featuring theme customization (dark/light/accents), dynamic animations, and integrated PDF viewing.",
    contribution:
      "Implemented component architecture, interactive modals, responsive CSS design tokens, and smooth scroll navigation.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "CSS3",
      "Responsive UI/UX",
    ],
    category: "Web / Software",
    status: "Completed",
    githubUrl: "https://github.com/daminsahu697-debug/portfolio",
    liveUrl: "https://damin-portfolio.vercel.app",
    imageAlt: "Damin Sahu Portfolio Website interface preview",
  },
];

export const projectCategories: ProjectCategory[] = [
  "All",
  "Web / Software",
  "AI / IoT",
];

// ---- Achievements ----
export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date?: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: "badminton",
    title: "First Prize — Badminton",
    subtitle: "NIAT sports event",
    description: "Won first prize in badminton competition at the college sports event.",
    date: "2026",
    icon: "Trophy",
  },
  {
    id: "uidai-hackathon",
    title: "Hackathon Participation",
    subtitle: "UIDAI Hackathon 2026 — Team TatvX",
    description: "Participated as a team member in UIDAI Hackathon 2026, working on digital identity verification challenges.",
    date: "2026",
    icon: "Zap",
  },
];

// ---- Currently Exploring ----
export const exploring = [
  {
    icon: "Monitor",
    title: "Modern Web Architectures",
    text: "Deepening my understanding of frontend performance, component design patterns, and responsive user interfaces.",
  },
  {
    icon: "Binary",
    title: "DSA & Problem Solving",
    text: "Consistently practicing data structures and algorithms to sharpen algorithmic problem-solving and efficiency.",
  },
  {
    icon: "Cpu",
    title: "AI & Embedded IoT",
    text: "Exploring practical applications of intelligent algorithms, microcontroller hardware, and connected sensors.",
  },
];

// ---- Resume Configuration ----
// ============================================================
// 📄 HOW TO UPDATE OR REPLACE YOUR RESUME:
// 1. Add your updated PDF file to the `public/` directory.
// 2. Name the file `resume.pdf` (or adjust `filePath` below).
// 3. Set `available: true` to display the download and preview buttons.
// ============================================================

export interface ResumeConfig {
  available: boolean;            // Toggle true when ready, false shows graceful placeholder
  title: string;                 // e.g. "Damin Sahu — Resume"
  subtitle: string;              // "A snapshot of my education, skills, projects, and journey so far."
  description: string;           // "Explore my education, technical skills, projects, and achievements in one place."
  filePath: string;              // Path in public directory, e.g. "/resume.pdf"
  downloadFileName: string;      // Filename when downloaded, e.g. "Damin_Sahu_Resume.pdf"
  fileFormat: string;            // e.g. "PDF Document"
  fileSize?: string;             // e.g. "1-Page PDF"
  lastUpdated?: string;          // e.g. "2026"
  placeholderMessage: string;    // "Resume coming soon — check back for updates."
  highlights: string[];          // Summary highlights for the card
}

export const resumeConfig: ResumeConfig = {
  available: true,
  title: "Damin Sahu — Resume",
  subtitle: "A snapshot of my education, skills, projects, and journey so far.",
  description: "Explore my education, technical skills, projects, and achievements in one place.",
  filePath: "/resume.pdf",
  downloadFileName: "Damin_Sahu_Resume.pdf",
  fileFormat: "PDF Document",
  fileSize: "1-Page PDF",
  lastUpdated: "2026",
  placeholderMessage: "Resume coming soon — check back for updates.",
  highlights: [
    "B.Tech CSE at NXTWAVE of Innovation in Advance Technology (CGPA: 9.33)",
    "SecureChain DMS & IoT Smart Waste Management System",
    "UIDAI Hackathon 2026 (Team TatvX) & Sports Competition Winner",
  ],
};
