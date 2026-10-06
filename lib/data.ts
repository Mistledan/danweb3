// Edit this file to change the content of the whole site.
//
// PROOF RULES
//   The Proof section lists real work only. No placeholders, no demos, no
//   projects you have not shipped. A prospect will ask about every entry, so
//   an entry exists only if you can talk about it in detail.
//   To add work: ship it first, then add it here with a live URL.

export const profile = {
  name: "Daniel Odewole",
  role: "Web3 & full-stack developer",
  headline: "I build websites, funnels and dApps for crypto teams.",
  intro:
    "Full-stack developer working remotely with crypto teams and clients worldwide. I design and ship complete products: frontends, APIs, and the on-chain integrations that connect them.",
  photo: "/dan.jpg",
  email: "danielthecryptoguy@gmail.com",
};

export const social = [
  { label: "X", handle: "@dantheweb3guy", href: "https://x.com/dantheweb3guy" },
  {
    label: "Instagram",
    handle: "@dantheweb3guy",
    href: "https://www.instagram.com/dantheweb3guy/",
  },
  { label: "GitHub", handle: "@Mistledan", href: "https://github.com/Mistledan" },
];

export type Project = {
  name: string;
  whatItDoes: string;
  problem: string;
  stack: string[];
  live?: string;
  code?: string;
};

/**
 * Real, shipped work. Each entry must be something you actually built and can
 * defend on a call.
 */
export const projects: Project[] = [
  {
    name: "Whitelist Mint Page",
    whatItDoes:
      "A token-gated launch page on Base Sepolia. A visitor connects a wallet, passes a live eligibility check that reads two on-chain assets, then signs a message to prove ownership of the address before their allocation is revealed.",
    problem:
      "Gating a launch page usually means deploying a claim contract and trusting whatever arithmetic the browser reports. This proves both eligibility and ownership using read-only calls and a signature instead, so there is no contract to deploy and no gas to spend. The eligibility rule is a pure function, which makes it testable at the threshold and mirrorable in Solidity later.",
    stack: ["Next.js", "wagmi", "viem", "TanStack Query", "Tailwind"],
    live: "https://whitelist-mint-page.vercel.app",
    code: "https://github.com/Mistledan/whitelist-mint-page",
  },
];

export type Step = {
  key: string;
  title: string;
  body: string;
};

// How the work actually runs: three stages, no mystery.
export const process: Step[] = [
  {
    key: "01",
    title: "Audit",
    body: "Before I write anything I map what exists: the code, the on-chain surface, the analytics, and where visitors drop off. You get the findings and a scoped plan, whether or not you hire me.",
  },
  {
    key: "02",
    title: "Build",
    body: "Short cycles, working software at the end of each one. Frontend, backend and contract work happen in the same repo and the same review, so nothing gets lost between specialists.",
  },
  {
    key: "03",
    title: "Launch",
    body: "Deploy, watch the real numbers, then iterate. I hand over the repo, the deploy pipeline and the keys, and I stay on to fix what the data shows is wrong.",
  },
];

// Replace this mailto with your scheduling link (Calendly, Cal.com, etc).
// The site reads this single value for the hero CTA and the closing CTA.
export const bookingLink = `mailto:${profile.email}?subject=Book%20a%20call`;
