import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "mirror-index-to-weddinginvitation",
      writeBundle() {
        const outDir = resolve(process.cwd(), "dist");
        const source = resolve(outDir, "index.html");
        const targetDir = resolve(outDir, "weddinginvitation");
        const target = resolve(targetDir, "index.html");

        if (!existsSync(source)) {
          return;
        }

        mkdirSync(targetDir, { recursive: true });
        copyFileSync(source, target);
      }
    }
  ]
});
