// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- ADD THIS IMPORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: 443,
    },
    allowedHosts: [".csb.app"],
  },
  resolve: {
    // <-- ADD THIS WHOLE SECTION
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
