import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import db from "@astrojs/db";
import node from "@astrojs/node";
import svelte from "@astrojs/svelte";

// https://stackoverflow.com/a/77522670/14522489
let adapter = vercel();
if (process.argv[3] === "--node" || process.argv[4] === "--node") {
    adapter = node({
        mode: "standalone"
    });
}

// https://astro.build/config
export default defineConfig({
    output: "server",
    site: 'https://example.com',
    integrations: [tailwind(), icon(), db(), svelte()],
    adapter,
});