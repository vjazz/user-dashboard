import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "userList",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./src/App.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom", "@mui/material"],
    }),
    {
      name: "vite-plugin-notify-host-on-rebuild",
      apply(config, { command }) {
        return Boolean(command === "build" && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch("http://localhost:3001/__fullReload");
          } catch (e) {
            console.log(e);
          }
        }
      },
    },
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
    strictPort: true,
    cors: true,
  },
});
