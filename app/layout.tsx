import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, social } from "@/lib/data";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

// Set NEXT_PUBLIC_SITE_URL in .env.production to your real domain (e.g. https://daniel.dev)
// so shared links resolve to absolute URLs. Falls back to localhost in development.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro,
  keywords: [
    "web3 developer",
    "crypto website developer",
    "crypto funnel builder",
    "dApp developer",
    "full-stack developer",
    "Next.js developer",
    "Node.js developer",
    "React developer",
    "wallet integration",
    "wagmi",
    "Solidity",
    "freelance crypto developer",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} — ${profile.role}`,
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.role}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    images: ["/og.png"],
  },

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              email: `mailto:${profile.email}`,
              image: `${siteUrl}${profile.photo}`,
              sameAs: social.map((s) => s.href),
            }),
          }}
        />
      </body>
    </html>
  );
}