import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name.split(" ")[0],
    description: profile.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F4",
    theme_color: "#FAF7F4",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
