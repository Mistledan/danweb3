import type { Config } from "tailwindcss";

// Palette sampled directly from dan.jpg (1024x1024):
//   backdrop  #BDBDBD  (light neutral gray, lum .74)
//   skin mid  #975B3F  (hue 19, sat .58)
//   skin lit  #D18A6C  (hue 18, sat .48)
//   shadow    #3A2721  (hue 14, sat .43, lum .17)
// Warm neutrals + a terracotta accent drawn from the measured 14-19 deg hue band.
// All text pairs verified against WCAG on #FAF7F4 (ink 16.2:1, mute 6.07:1, clay 4.6:1).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F4", // page background, warm off-white
        card: "#FFFFFF",
        ink: "#241812", // deep espresso near-black, AAA on paper
        mute: "#6B5B52", // warm gray body text, AA on paper
        line: "#E7DFD8", // warm hairline border
        surface: "#F1EAE3", // warm panel, analogue of Figma #ececf0
        clay: "#B4552A", // terracotta accent, AA on paper
        claydeep: "#8F3F1C", // accent hover, 6.79:1 on paper
        espresso: "#3A2721", // measured shadow tone, AAA on paper
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.625rem", // Figma --radius
        lift: "1rem", // Figma --radius-2xl
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,24,18,0.04), 0 8px 24px rgba(36,24,18,0.06)",
        lift: "0 2px 4px rgba(36,24,18,0.06), 0 18px 48px rgba(36,24,18,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;