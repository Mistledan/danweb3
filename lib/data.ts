// Edit this file to change the content of the whole site.
//
// IMPORTANT - projects:
//   Every entry below has status: "in-progress". They were written to fill the
//   grid and show layout, not to be passed off as finished client work.
//   Replace each one with work you actually did and flip status to "shipped",
//   or delete it before sending this site to anyone.
export const profile = {
  name: "Daniel Odewole",
  role: "Web3 & full-stack developer",
  headline: "I build websites, funnels and dApps for crypto teams.",
  intro:
    "Full-stack developer working remotely with crypto teams and clients worldwide. I design and ship complete products: frontends, APIs, and the on-chain integrations that connect them.",
  photo: "/dan.jpg",
  email: "danielthecryptoguy@gmail.com",
};

// Social accounts rendered in the hero and footer.
// Edit a handle here and it updates in every section at once.
export const social = [
  { label: "X", handle: "@dantheweb3guy", href: "https://x.com/dantheweb3guy" },
  {
    label: "Instagram",
    handle: "@dantheweb3guy",
    href: "https://www.instagram.com/dantheweb3guy/",
  },
  { label: "GitHub", handle: "@Mistledan", href: "https://github.com/Mistledan" },
];

// Infinite strip under the hero. Keep entries short so the marquee reads cleanly.
export const marquee = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "viem",
  "wagmi",
  "Alchemy",
  "GraphQL",
  "Docker",
  "Framer Motion",
];

// What you actually offer, shown as tags under the About text.
// These are drawn from your X bio ("websites and funnels for crypto teams").
export const services = [
  "Websites",
  "Funnels",
  "dApp frontends",
  "Wallet integration",
  "Token gating",
  "Telegram bots",
  "CMS setup",
  "Analytics",
];

export const about = [
  "I work across the whole stack and in crypto, which means I can carry a feature from the database schema, through the smart contract call, all the way to the pixel it lands on. That end-to-end ownership lets me make better trade-offs, because I can see the cost of a decision on both sides.",
  "I started in Web3 business development, where I learned how projects actually reach people. That background still shapes how I build. Crypto users bounce fast and trust nothing, so I care about pages that load quickly, explain what they want, and make the next step obvious.",
  "Since 2023 I've worked as a freelance developer, taking client projects from first sketch to live deployment. Right now I'm focused on websites, funnels and dApps for crypto teams. I'm open to remote roles and freelance work.",
];

export const skills = [
  {
    group: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Accessibility",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Redis",
    ],
  },
  {
    group: "Web3",
    items: [
      "wagmi",
      "viem",
      "Wallet connection",
      "Alchemy",
      "On-chain data",
      "Solidity basics",
      "Token gating",
    ],
  },
  {
    group: "Ship",
    items: ["Git and GitHub", "Vercel", "Docker", "CI/CD", "CMS setup", "Analytics"],
  },
];

export const projects = [
  {
    title: "Meridian Markets",
    description:
      "A crypto market dashboard where traders connect a wallet to track portfolio value, set price alerts and analyse pool liquidity, with live prices and on-chain data served by a Node.js backend and cached in Postgres.",
    stack: ["Next.js", "wagmi", "viem", "Node.js", "PostgreSQL"],
    status: "in-progress", // honest label: replace with "shipped" when real
    live: "", // add the live URL
    code: "",
  },
  {
    title: "Whitelist Mint Page",
    description:
      "A token-gated launch page on Base Sepolia. Eligible wallets connect, pass a live on-chain eligibility check across two assets, then sign a message to prove ownership before their allocation is revealed. Read-only, so it never spends gas.",
    stack: ["Next.js", "wagmi", "viem", "TanStack Query", "Tailwind"],
    status: "shipped",
    live: "https://whitelist-mint-page.vercel.app",
    code: "https://github.com/Mistledan/whitelist-mint-page",
  },
  {
    title: "Telegram Deal Funnel",
    description:
      "A multi-step funnel that moves a visitor from a landing page into a Telegram community, with bot-driven verification and follow-up.",
    stack: ["Next.js", "Node.js", "Telegram API", "PostgreSQL"],
    status: "in-progress", // honest label: replace with "shipped" when real
    live: "",
    code: "",
  },
  {
    title: "On-Chain Analytics API",
    description:
      "A REST service that indexes wallet activity and returns holder growth, whale movements and retention metrics on demand.",
    stack: ["Node.js", "Express", "PostgreSQL", "Alchemy"],
    status: "in-progress", // honest label: replace with "shipped" when real
    live: "",
    code: "",
  },
  {
    title: "Protocol Docs Site",
    description:
      "A documentation site for a DeFi protocol, with versioned guides, searchable reference content and live network data widgets.",
    stack: ["Next.js", "MDX", "Tailwind", "Vercel"],
    status: "in-progress", // honest label: replace with "shipped" when real
    live: "",
    code: "",
  },
  {
    title: "Community Dashboard",
    description:
      "An internal dashboard for a crypto community, tracking member growth, engagement and campaign performance in one place.",
    stack: ["React", "Node.js", "PostgreSQL", "Recharts"],
    status: "in-progress", // honest label: replace with "shipped" when real
    live: "",
    code: "",
  },
];
