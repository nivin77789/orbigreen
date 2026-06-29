import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssMinify: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/lenis")) return "lenis";
          if (id.includes("node_modules/framer-motion")) return "framer-motion";
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/@remix-run/router")
          ) {
            return "router";
          }
        },
      },
    },
  },
});
