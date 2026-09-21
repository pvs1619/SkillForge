export type Category =
  | "Artificial Intelligence"
  | "Data & Analytics"
  | "Web Development"
  | "Design"
  | "Cybersecurity"
  | "Finance & Analytics"
  | "Career Skills";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  duration: string;
  date: string;
  location: string;
  isOnline: boolean;
  instructor: {
    name: string;
    role: string;
    department: string;
  };
  shortDescription: string;
  description: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  format: string;
  seatsAvailable: number;
  totalSeats: number;
}

export const WORKSHOPS: Workshop[] = [
  {
    id: "ws-1",
    slug: "building-your-first-machine-learning-model",
    title: "Building Your First Machine Learning Model",
    category: "Artificial Intelligence",
    difficulty: "Beginner",
    duration: "3 hours",
    date: "Saturday, Oct 11, 2025",
    location: "Lab 3B, Turing Academic Block & Online Stream",
    isOnline: true,
    instructor: {
      name: "Dr. Ananya Sharma",
      role: "Visiting Assistant Professor",
      department: "Dept. of Computer Science & Automation",
    },
    shortDescription:
      "A hands-on introduction to data preprocessing, supervised learning fundamentals, and model evaluation using scikit-learn.",
    description:
      "This workshop strips away the mystique of machine learning to focus on foundational mechanics. You will walk through the entire lifecycle: ingesting a raw dataset, addressing missing values, choosing an appropriate baseline classifier, tuning hyperparameters, and evaluating performance using precision, recall, and ROC curves.",
    whatYouWillLearn: [
      "Understand supervised vs unsupervised problem framing",
      "Clean, normalize, and split tabular datasets safely",
      "Train logistic regression and random forest baselines in scikit-learn",
      "Interpret confusion matrices and avoid common data leakage pitfalls",
    ],
    prerequisites: [
      "Basic Python syntax (functions, lists, conditionals)",
      "Familiarity with foundational algebra concepts",
    ],
    format: "90 min live walk-through + 60 min lab exercise + 30 min Q&A",
    seatsAvailable: 14,
    totalSeats: 45,
  },
  {
    id: "ws-2",
    slug: "python-for-data-analysis",
    title: "Python for Data Analysis",
    category: "Data & Analytics",
    difficulty: "Beginner",
    duration: "2.5 hours",
    date: "Wednesday, Oct 15, 2025",
    location: "Seminar Hall A, Science Quad",
    isOnline: false,
    instructor: {
      name: "Rohan Varma",
      role: "Senior Data Fellow",
      department: "School of Informatics",
    },
    shortDescription:
      "Master core data wrangling routines with Pandas and NumPy, moving beyond spreadsheet limitations.",
    description:
      "Learn how to manipulate large tabular datasets with confidence. We focus on idiomatic Pandas operations—filtering, aggregation, group-by pipelines, and merges—teaching you to write clean, vectorised Python code that executes quickly and reads clearly.",
    whatYouWillLearn: [
      "Series and DataFrame indexing, filtering, and assignment",
      "Grouping operations and aggregation pipelines",
      "Handling null values, data types, and timestamps cleanly",
      "Exporting structured outputs for downstream reports",
    ],
    prerequisites: [
      "Introductory Python knowledge",
      "Laptop with Jupyter Notebook or VS Code installed",
    ],
    format: "Hands-on guided programming session with live dataset exercises",
    seatsAvailable: 8,
    totalSeats: 40,
  },
  {
    id: "ws-3",
    slug: "designing-better-digital-interfaces",
    title: "Designing Better Digital Interfaces",
    category: "Design",
    difficulty: "Intermediate",
    duration: "3 hours",
    date: "Friday, Oct 17, 2025",
    location: "Studio 2, Design & Media Centre",
    isOnline: true,
    instructor: {
      name: "Meera Krishnan",
      role: "Lead Product Designer & Lecturer",
      department: "Human-Computer Interaction Lab",
    },
    shortDescription:
      "Practical UI/UX design systems, typographical hierarchy, spacing scales, and accessible interaction patterns.",
    description:
      "Good interface design is not decoration; it is systematic visual communication. In this studio workshop, we dissect why interfaces feel clumsy or effortless. You will establish a cohesive design token system, master type scales, refine spatial cadence, and design accessible components.",
    whatYouWillLearn: [
      "Constructing an 8pt spatial grid and predictable layout tokens",
      "Establishing typographic hierarchy and optical balance",
      "Applying WCAG 2.1 AA color contrast and focus indicator standards",
      "Auditing state flows: empty, loading, error, and partial states",
    ],
    prerequisites: [
      "Basic understanding of web pages or user interface concepts",
      "No prior graphic design tool experience required",
    ],
    format: "Design audit teardown + interactive layout workshop",
    seatsAvailable: 19,
    totalSeats: 35,
  },
  {
    id: "ws-4",
    slug: "introduction-to-generative-ai",
    title: "Introduction to Generative AI",
    category: "Artificial Intelligence",
    difficulty: "Intermediate",
    duration: "2.5 hours",
    date: "Tuesday, Oct 21, 2025",
    location: "Virtual Classroom (Interactive Webinar)",
    isOnline: true,
    instructor: {
      name: "Dr. K. S. Ramanathan",
      role: "Associate Professor",
      department: "Centre for Artificial Intelligence Research",
    },
    shortDescription:
      "Understand the mechanics of Large Language Models, embeddings, and structured prompt engineering for real applications.",
    description:
      "Go beyond chat interfaces to understand how generative transformer models actually work. We will examine tokenization, attention mechanisms, vector embeddings, and deterministic API parameters, preparing you to integrate LLM capabilities cleanly into software projects.",
    whatYouWillLearn: [
      "Transformer decoder mechanics and context window dynamics",
      "Embedding vectors and similarity search intuition",
      "Deterministic structured output generation (JSON mode)",
      "Evaluation strategies and mitigation of hallucination risks",
    ],
    prerequisites: [
      "Familiarity with REST APIs or basic Python scripting",
      "Basic understanding of linear algebra",
    ],
    format: "Interactive lecture, code demonstration, and notebook walkthrough",
    seatsAvailable: 27,
    totalSeats: 60,
  },
  {
    id: "ws-5",
    slug: "data-visualization-with-python",
    title: "Data Visualization with Python",
    category: "Data & Analytics",
    difficulty: "Intermediate",
    duration: "2 hours",
    date: "Thursday, Oct 23, 2025",
    location: "Lab 1A, Mathematics & Computing Wing",
    isOnline: false,
    instructor: {
      name: "Pooja Deshmukh",
      role: "Computational Research Scholar",
      department: "Dept. of Applied Statistics",
    },
    shortDescription:
      "Craft publication-quality charts and exploratory visualisations using Matplotlib, Seaborn, and Plotly.",
    description:
      "Data analysis is incomplete if findings cannot be communicated accurately. This workshop trains you in visual storytelling ethics, chart selection for diverse data distributions, and custom styling to avoid default library aesthetic clutter.",
    whatYouWillLearn: [
      "Choosing appropriate visual encodings for distinct data types",
      "Formatting axes, labels, annotations, and legends professionally",
      "Creating interactive plots with hover data and facet grids",
      "Exporting vector graphics (SVG/PDF) for academic writeups",
    ],
    prerequisites: [
      "Comfort with basic Pandas DataFrame slicing",
    ],
    format: "Step-by-step coding session with real institutional datasets",
    seatsAvailable: 11,
    totalSeats: 30,
  },
  {
    id: "ws-6",
    slug: "git-and-github-for-developers",
    title: "Git & GitHub for Developers",
    category: "Web Development",
    difficulty: "Beginner",
    duration: "2.5 hours",
    date: "Monday, Oct 27, 2025",
    location: "Lecture Hall 4, Engineering Block",
    isOnline: true,
    instructor: {
      name: "Aditya Nair",
      role: "Software Engineering Fellow",
      department: "Dept. of Computer Science",
    },
    shortDescription:
      "Master version control branching workflows, conflict resolution, clean commits, and collaborative Pull Requests.",
    description:
      "Version control is the bedrock of modern software collaboration. This workshop replaces trial-and-error memorisation with mental models of Git's DAG (Directed Acyclic Graph), staging mechanics, interactive rebasing, and GitHub PR workflows.",
    whatYouWillLearn: [
      "The Git object model: blobs, trees, commits, and refs",
      "Branching strategies: feature branches vs trunk-based development",
      "Diagnosing and resolving merge conflicts without panic",
      "Writing clear commit messages and opening structured PR reviews",
    ],
    prerequisites: [
      "A working terminal/command line environment",
      "A free GitHub account",
    ],
    format: "Hands-on terminal workshop with mock collaborative repository",
    seatsAvailable: 22,
    totalSeats: 50,
  },
  {
    id: "ws-7",
    slug: "foundations-of-cybersecurity",
    title: "Foundations of Cybersecurity",
    category: "Cybersecurity",
    difficulty: "Beginner",
    duration: "3 hours",
    date: "Wednesday, Oct 29, 2025",
    location: "Cyber Systems Lab, West Wing",
    isOnline: true,
    instructor: {
      name: "Tanya Sen",
      role: "Security Analyst & Industry Fellow",
      department: "Information Security Group",
    },
    shortDescription:
      "Core principles of threat modeling, common web vulnerabilities (OWASP Top 10), and defensive coding practices.",
    description:
      "Explore security from an engineer's perspective. We examine attack vectors such as injection, broken access control, cross-site scripting (XSS), and insecure dependencies, exploring concrete defensive engineering practices to mitigate them.",
    whatYouWillLearn: [
      "Threat modeling principles using STRIDE methodology",
      "Identifying and mitigating SQL injection and XSS vulnerabilities",
      "Authentication and session management fundamentals",
      "Cryptographic primitives: hashing vs symmetric vs asymmetric encryption",
    ],
    prerequisites: [
      "Basic understanding of HTTP and client-server architecture",
    ],
    format: "Conceptual grounding followed by interactive vulnerability walkthrough",
    seatsAvailable: 6,
    totalSeats: 35,
  },
  {
    id: "ws-8",
    slug: "financial-analytics-with-python",
    title: "Financial Analytics with Python",
    category: "Finance & Analytics",
    difficulty: "Intermediate",
    duration: "3 hours",
    date: "Saturday, Nov 01, 2025",
    location: "Executive Seminar Room, Management Block",
    isOnline: false,
    instructor: {
      name: "Vikramaditya Rao",
      role: "Adjunct Faculty",
      department: "Dept. of Financial Economics",
    },
    shortDescription:
      "Analyze historical market returns, portfolio risk metrics (Sharpe, drawdown), and time-series modeling.",
    description:
      "An analytical approach to financial datasets. We ingest live time-series data, compute compound returns, calculate volatility and Sharpe ratios, and simulate asset allocation scenarios using Python numerical libraries.",
    whatYouWillLearn: [
      "Working with datetime indexes and resampled financial series",
      "Computing expected return, standard deviation, and maximum drawdown",
      "Backtesting simple moving-average rebalancing rules",
      "Visualising risk-return trade-offs and portfolio frontiers",
    ],
    prerequisites: [
      "Python intermediate level (Pandas & NumPy basics)",
      "Basic understanding of interest and compound growth",
    ],
    format: "Case-study driven quantitative workshop",
    seatsAvailable: 15,
    totalSeats: 35,
  },
  {
    id: "ws-9",
    slug: "building-responsive-web-interfaces",
    title: "Building Responsive Web Interfaces",
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "3 hours",
    date: "Tuesday, Nov 04, 2025",
    location: "Lab 2C, Tech Tower",
    isOnline: true,
    instructor: {
      name: "Siddharth Hegde",
      role: "Staff Frontend Architect",
      department: "Web Technologies Group",
    },
    shortDescription:
      "Modern CSS layout patterns: CSS Grid, Flexbox, container queries, fluid typography, and touch ergonomics.",
    description:
      "Responsive design has evolved far beyond media queries. Learn how modern CSS features like CSS Grid auto-fit, container queries (`@container`), intrinsic sizing with `min()`, `max()`, and `clamp()`, and touch target ergonomics yield resilient responsive interfaces.",
    whatYouWillLearn: [
      "Fluid typography and layout scaling without breakpoint spam",
      "CSS Grid vs Flexbox: intentional layout selection rules",
      "Component-driven responsiveness using CSS container queries",
      "Touch target sizing and mobile browser viewport quirks",
    ],
    prerequisites: [
      "Basic HTML & CSS knowledge",
      "Familiarity with inspecting elements in browser developer tools",
    ],
    format: "Live browser layout lab with real-world component refactors",
    seatsAvailable: 12,
    totalSeats: 40,
  },
  {
    id: "ws-10",
    slug: "interview-skills-for-technical-careers",
    title: "Interview Skills for Technical Careers",
    category: "Career Skills",
    difficulty: "Beginner",
    duration: "2 hours",
    date: "Thursday, Nov 06, 2025",
    location: "Auditorium Annex & Live Stream",
    isOnline: true,
    instructor: {
      name: "Priyanka Basu",
      role: "Career Development Advisor",
      department: "University Career & Internship Cell",
    },
    shortDescription:
      "Frameworks for technical interviews, structured problem communication, behavioral STAR method, and portfolio curation.",
    description:
      "Technical competency is only half the equation in engineering hiring. This practical session focuses on structured communication during whiteboard or pair-programming rounds, unpacking behavioral prompts with the STAR framework, and presenting project repositories effectively.",
    whatYouWillLearn: [
      "How to think out loud and clarify constraints during coding rounds",
      "Structuring behavioral responses using the STAR method",
      "Curating an honest, impactful GitHub profile and project README",
      "Navigating technical compensation discussions and offer evaluations",
    ],
    prerequisites: [
      "Open to students from all engineering and science disciplines",
    ],
    format: "Interactive framework delivery + live mock interview breakdown",
    seatsAvailable: 31,
    totalSeats: 80,
  },
];

export const CATEGORIES: Category[] = [
  "Artificial Intelligence",
  "Data & Analytics",
  "Web Development",
  "Design",
  "Cybersecurity",
  "Finance & Analytics",
  "Career Skills",
];

export const DIFFICULTIES: Difficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export function getWorkshops(): Workshop[] {
  return WORKSHOPS;
}

export function getWorkshopById(id: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.id === id || w.slug === id);
}

export function getWorkshopsByCategory(category: Category): Workshop[] {
  return WORKSHOPS.filter((w) => w.category === category);
}

export function getFeaturedWorkshops(): Workshop[] {
  return WORKSHOPS.slice(0, 4);
}
