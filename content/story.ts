import type { StoryChapter } from "./types";

/**
 * The long-read. Honest, first-person tone, from Nicolas's real history.
 * `depth` (0 to 1) decides whether a chapter sits in the light or dark half of
 * the palette. Add `image` (drop the file in /public/story) for real photos.
 */
export const story: StoryChapter[] = [
  {
    index: "01",
    year: "2013",
    kicker: "The Origin",
    headline: "It started with a game.",
    paragraphs: [
      "I was seven or eight when Minecraft taught me I could build. I started messing with command blocks, then spent most of my time making maps and releasing them for the community to play.",
      "They were never hits, a few dozen downloads at most. But watching people I would never meet actually play something I had made did something to me. That feeling, that other people could use and enjoy the things I built, is the whole reason I never stopped.",
    ],
    quote:
      "A few dozen downloads, from strangers, playing something I made. That was enough to hook me.",
    motif: "grass",
    depth: 0,
  },
  {
    index: "02",
    year: "2019",
    kicker: "Exploration",
    headline: "I built a lot of things that went nowhere.",
    paragraphs: [
      "In 2019 I started a technical secondary school. The first thing I built was an ecommerce site with friends. I helped get it going, then walked away when it started heading somewhere I didn't want my name on. It was the first time I chose principles over a shortcut, and I would make the same call again.",
      "So I built for myself instead. A calculator for the automotive workshop at school, made in Unity with C#, learned from YouTube at night. Automotive was never my thing, so I quietly steered the assignment toward the part I loved: the code.",
      "Then came games. Procedural worlds from noise maps, inventory and building systems, simple Unity interfaces, even local and online multiplayer over Steam, which taught me how servers and clients stay in sync. None of them officially shipped, but my friends and I played them for hours, and that was the point. I loved building them, long before I could see a career in it.",
    ],
    quote: "None of them officially shipped. My friends and I played them for hours anyway.",
    depth: 0.1,
  },
  {
    index: "03",
    year: "2023",
    kicker: "The Niche",
    headline: "I found data. Then I got it wrong.",
    paragraphs: [
      "By my fifth year I went looking on my own and found the data world. I read everything I could on the difference between data engineering, data science and analytics, what the market actually needed, and what pulled at me. I chose a mix: data science for the math and code I loved, with the storytelling and dashboards of analytics on top.",
      "I started studying for real. Harvard's CS50P and CS50SQL, then IBM's data science track. And here is the mistake I still think about: I obsessed over tools, models, benchmarks and syntax instead of the concepts underneath. I went in circles for months, frustrated, with no clear path.",
      "All of it on top of an electronics degree that ran me into the ground. The long nights taught me something the courses couldn't: how to keep going when it stops being fun.",
    ],
    quote: "I chased the tools and lost the plot. That cost me months.",
    aside: {
      label: "The lesson",
      text: "Tools are interchangeable. Concepts aren't. I just didn't know it yet.",
    },
    depth: 0.26,
  },
  {
    index: "04",
    year: "2024",
    kicker: "Learning to Lead",
    headline: "A planter taught me I couldn't do it alone.",
    paragraphs: [
      "In my sixth year the school entered a national innovation competition. I led a team to build a smart modular planter: an ESP32, sensors and actuators regulating temperature, humidity, irrigation and indoor light, all traceable from a mobile app wired to Firebase.",
      "We placed well, but we didn't win. The real prize was the lesson. I couldn't carry everything myself. I had to find what each person was good at, hand them real ownership, set clear deadlines, and trust the process.",
      "The next year I put that to work at the Siemens LOGO! national competition, this time purely as the lead. Roles from day one, timelines and budgets in Notion, clean documentation, decisions made and everyone's context kept. I took only the data infrastructure: MQTT, APIs, a documented Postgres schema. We earned an honorable mention, and I had barely written the most code on the team.",
    ],
    quote: "The year before, I did everything myself. This time I led. We went much further.",
    depth: 0.42,
  },
  {
    index: "05",
    year: "2025",
    kicker: "The Break",
    headline: "Luno took a chance on an eighteen year old.",
    paragraphs: [
      "Somewhere in there I started leaving a trail: LinkedIn, GitHub, a first portfolio. Certificates, projects, things I was learning out loud. That trail reached Juan Pablo Celiz, the COO of Luno and my teacher back in first year. Every few months he would check in, advise, encourage. Then one day he told me there was a data engineering vacancy.",
      "I pivoted hard, and this time I studied differently. Not the trendiest tool, but the concept under it. Not 'I use Snowflake because everyone does', but what a data warehouse really is, why it exists, when not to use it, and where it fits. Once the concept was clear, the tools were just interchangeable details. That shift is what took me far, fast. It was also the first thing I passed to Dylan, a classmate and one of my closest friends who was getting into data engineering too: stop chasing tools, look at the problem underneath.",
      "Then came the technical interview. Ezequiel, a senior data engineer, spent a long time digging into what I knew and what I didn't. I walked out hired. In April 2025, at eighteen and still finishing school, I started at Luno as a Junior Data Engineer. After years of wandering and doubting myself, it felt almost unreal.",
    ],
    quote: "Stop chasing tools. Understand the problem underneath. That changed everything.",
    aside: {
      label: "The redemption",
      text: "The concepts I'd skipped in data science became the exact reason I moved fast in data engineering.",
    },
    depth: 0.58,
  },
  {
    index: "06",
    year: "2025",
    kicker: "The Deep End",
    headline: "Straight into systems that mattered.",
    paragraphs: [
      "They gave me real trust and real scope, with Ezequiel and Felisindo, two seniors I owe a lot, watching over the work. I built entire APIs, ran ETL pipelines for hundreds of thousands of users, and worked across Airflow, Snowflake and AWS, learning what security and scale actually demand.",
      "The hardest thing I did was a migration. More than 70,000 users trapped in a legacy database: broken relations, missing data, no documentation, years of other people's decisions tangled together. I wrote parsing scripts, fallbacks and automatic backups, and ran a single execution that took over ten hours. It worked. Cleanly.",
      "Taking something broken and undocumented and turning it into something clean is patient, unglamorous work. I could only do it because of the data science and exploratory analysis I had taught myself years earlier. None of it was wasted.",
    ],
    quote: "70,000 users. A ten hour run. Broken data turned clean. It held.",
    depth: 0.7,
  },
  {
    index: "07",
    year: "Late 2025",
    kicker: "The Send-off",
    headline: "Then it all arrived at once.",
    paragraphs: [
      "By the end of 2025 everything landed in the same stretch. Luno made my contract permanent. I finished the electronics degree as the best performing student in the entire school. And I crossed the line I had been walking toward for years: from student to professional.",
    ],
    highlights: ["Top of the institution", "Flag-bearer", "9.45 GPA", "Permanent at Luno"],
    depth: 0.82,
  },
  {
    index: "08",
    year: "2026",
    kicker: "Exos",
    headline: "I stopped just writing code.",
    paragraphs: [
      "In 2026 I got Dylan an interview at Luno. He got in, and we started working side by side, splitting the load the way good teams do. My own scope kept growing too: planning whole infrastructures, writing proposals for new clients, sitting in weekly calls. I had become a Semi-Senior, guiding projects instead of just closing tickets.",
      "On the side, Dylan and I founded Exos, a small studio building software for Argentine SMBs. Our first big build was CongressIA: a full platform for medical congresses, three connected systems and a landing for three completely different audiences. Two people, three months.",
      "It also forced me to face something. I always told myself I wasn't creative, that I couldn't do design or frontend. It turned out that was just fear. I built the entire frontend myself: brand identity, a distinct voice and value for doctors, organizers and industries, responsive and intuitive on every device. With fundamentals, a clear structure and AI as a multiplier, two of us shipped something I would have sworn needed a whole studio.",
    ],
    quote: "I thought I wasn't creative. It was just fear.",
    aside: {
      label: "Not everything went smooth",
      text: "One deal didn't close the way we expected. We learned to protect the work and our terms. The build still stands as some of the best we've done.",
    },
    depth: 0.92,
  },
  {
    index: "09",
    year: "Today",
    kicker: "Now",
    headline: "I'm not just a data engineer anymore.",
    paragraphs: [
      "These days I can take something from a first conversation to a system in production: understand what a client actually needs, turn it into a plan, and deliver it, alone or guiding a small team to a standard I am proud of.",
      "I'm still building. Exos and its multi-tenant systems for small companies. CapyThemAll, my own ecommerce inside that ecosystem. And I'm deliberately growing the parts that aren't code: leadership, project management, the way I communicate. I have a lot left to learn, and that is the best part.",
    ],
    quote: "Same instinct as the maps I made at eight. Much bigger stakes.",
    depth: 1,
  },
];

/**
 * Closing reflection. Edit freely.
 */
export const storyReflection = {
  kicker: "What I actually believe",
  lines: [
    "I have the certificates. They opened doors. But they are not where any of this came from.",
    "It came from a kid who wanted his friends to have something to play, and never stopped wanting to build things people actually use.",
    "Especially now, with AI, the scarce part was never the syntax. It is the wanting: the curiosity, the creativity, and the will to turn a real problem into something that works.",
    "That is the part I am betting my career on.",
  ],
} as const;
