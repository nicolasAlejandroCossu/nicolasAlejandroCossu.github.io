/**
 * Single source of truth for identity, copy and links.
 * Update values here and they propagate across every section.
 */
export const site = {
  name: "Nicolas Cossu",
  role: "Forward Deployed Engineer",

  // Hero tagline: your one-line take on what a Forward Deployed Engineer is.
  // Replace with your preferred phrasing.
  tagline: "The bridge between deep engineering and the client's frontier.",
  heroStatement:
    "I build the critical data systems companies depend on, then embed where they're actually used.",

  location: "Buenos Aires, Argentina",
  available: true,
  availabilityNote:
    "Open to Forward Deployed Engineer, Data Engineer, Project Manager and Team Lead roles.",

  email: "nicolas.cossu2006@gmail.com",
  links: {
    email: "mailto:nicolas.cossu2006@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicolas-cossu",
    github: "https://github.com/nicolasAlejandroCossu",
    agency: "https://exos-landing.vercel.app",
  },

  agency: {
    name: "Exos",
    role: "Founder",
    url: "https://exos-landing.vercel.app",
  },

  // Drop the PDF in /public with this exact name to enable the download.
  cv: "/Nicolas-Cossu-CV.pdf",

  // Drop /public/profile.jpg, then set this to "/profile.jpg" to show your portrait.
  photo: "/profile.webp",
} as const;

// "What is an FDE": the convergence moment.
export const fde = {
  left: "Deep Engineering",
  right: "Client Frontier",
  term: "Forward Deployed Engineer",
  lines: [
    "A Forward Deployed Engineer doesn't ship code and walk away.",
    "I embed in the client's hardest problem and own the system that solves it, from architecture to production.",
  ],
  // Three pillars of the role (rendered as a clean trio, no math symbols).
  pillars: ["Deep engineering", "Client strategy", "Field execution"],
} as const;

export const nav = [
  { label: "About", target: "#about" },
  { label: "Experience", target: "#experience" },
  { label: "Work", target: "#work" },
  { label: "Capabilities", target: "#capabilities" },
  { label: "Contact", target: "#contact" },
] as const;
