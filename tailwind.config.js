/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [require("daisyui")],
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
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
};
