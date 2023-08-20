/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{ts,tsx}",
    // "./components/**/*.{ts,tsx}",
    // "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        iransans: "iransans",
        iransansnum: "iransansnum",
        iransansbold: "iransansbold",
        iranyekan: "iranyekan",
        iranyekan_bold: "iranyekan_bold",
      },
      colors: {
        success: " #07bc0c",
        error: "#e74c3c",
        warning: "#f3c610",
        info: "#3498db",
        dark_1: "#0c0c0c",
        dark_2: "#232933",
        dark_3: "#424750",
        dark_4: "#62666d",
        dark_5: "#81858b",
        dark_6: "#a1a3a8",
        dark_7: "#c0c2c5",
        g1_1: "#264653",
        g1_2: "#2a9d8f",
        g1_3: "#e9c46a",
        g1_4: "#f4a261",
        g1_5: "#e1421a",
        g1_6: "#1ccaff",
        g1_7: "#2079c5",

        g2_1: "#8e9aaf",
        g2_2: "#cbc0d3",
        g2_3: "#efd3d7",
        g2_4: "#feeafa",
        g2_5: "#dee2ff",

        g3_0: "#f0faff",
        g3_1: "#6ec1e4",
        g3_2: "#2bbef9",
        g3_3: "#0693e3",
        g3_4: "#007bff",
        g3_5: "#233a95",

        g0_a1: "#404258",
        g0_a2: "#474e68",
        g0_a3: "#50577a",
        g0_a4: "#6b728e",

        light_1: "#fff",
        light_2: "#f0f0f1",
        light_3: "#e0e0e2",
        light_4: "#c0c2c5",
        light_5: "#a1a3a8",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#2079c5",
          secondary: "#1ccaff",
          accent: "#2a9d8f",
          neutral: "#264653",
          "base-100": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "snow",
          },
        },
      },
    ],
  },
};
