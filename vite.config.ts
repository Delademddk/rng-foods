import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching and parallel loading
        manualChunks: (id) => {
          // Vendor chunk for node_modules
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("react-router-dom")) return "react-router";
            if (id.includes("lucide-react") || id.includes("react-icons"))
              return "icons";
            return "vendor";
          }
        },
      },
    },
  },
});
