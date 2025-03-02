import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Plugins tell Vite how to handle different file types, like .tsx
  plugins: [react()],

  // Optional: Customize your build output folder
  build: {
    outDir: "dist",
  },

  // Optional: If you have a dev server port preference or proxy settings,
  // you can specify them here:
  server: {
    port: 3000, // or any port you prefer
  },

  // Optional: If you ever need to set a base URL for deployment, you can do:
  // base: "/my-base-url/"
});