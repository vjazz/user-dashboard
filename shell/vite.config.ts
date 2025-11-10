import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        userList: "http://localhost:3001/assets/remoteEntry.js",
        userDetails: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom", "@mui/material"],
    }),
    {
      name: "vite-plugin-reload-endpoint",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/__fullReload") {
            server.hot.send({ type: "full-reload" });

            res.end("Full reload triggered");
          } else {
            next();
          }
        });
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
    port: 3000,
    strictPort: true,
    cors: true,
  },
});
