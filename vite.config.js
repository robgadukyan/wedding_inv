import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
export default defineConfig({
    plugins: [
        react(),
        {
            name: "mirror-index-to-weddinginvitation",
            writeBundle: function () {
                var outDir = resolve(process.cwd(), "dist");
                var source = resolve(outDir, "index.html");
                var targetDir = resolve(outDir, "weddinginvitation");
                var target = resolve(targetDir, "index.html");
                if (!existsSync(source)) {
                    return;
                }
                mkdirSync(targetDir, { recursive: true });
                copyFileSync(source, target);
            }
        }
    ]
});
