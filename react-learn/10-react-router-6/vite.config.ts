import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const rootDir = ".";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "./src" }],
  },
});
