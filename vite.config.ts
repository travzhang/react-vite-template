import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import devServer from "@hono/vite-dev-server";
import build from "@hono/vite-build/node";
import Pages from "vite-plugin-pages";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // @ts-ignore
    babel({
      presets: [reactCompilerPreset()],
      plugins: [["istanbul", {}]],
    }),
    Pages(),
    tailwindcss(),
    build({
      entry: "./src/api/index.ts",
      port: 8080,
      external: ["@prisma/client"],
    }),
    devServer({
      entry: "./src/api/index.ts",
      exclude: [/^(?!\/api(\/|$|\?))/],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
