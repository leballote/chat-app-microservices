import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000/graphql",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/subs": {
        target: "ws://localhost:4000/graphql",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/subs/, ""),
      },
    },
  },
});
