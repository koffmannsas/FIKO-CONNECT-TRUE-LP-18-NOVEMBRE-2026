import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const serverGeminiPath = path.resolve(__dirname, "../server/geminiService.js");
const serverGeminiUrl = pathToFileURL(serverGeminiPath).href;

export default defineConfig(({ mode }) => {
  loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      hmr: false,
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    },
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
      {
        name: "server-gemini-api",
        configureServer(server) {
          if (!fs.existsSync(serverGeminiPath)) return;

          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith("/api/gemini")) {
              try {
                const { handleGeminiApiRequest } = await import(/* @vite-ignore */ serverGeminiUrl);
                await handleGeminiApiRequest(req, res);
              } catch (err) {
                console.error("[Vite Gemini Middleware Error]:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "Failed to handle Gemini API request" }));
              }
              return;
            }
            next();
          });

          if (server.httpServer) {
            import(/* @vite-ignore */ serverGeminiUrl).then(({ setupGeminiLiveWebSocket }) => {
              setupGeminiLiveWebSocket(server.httpServer);
              console.log("✅ Server-side Gemini Live WebSocket bridge registered");
            }).catch(err => console.error("[Vite Live WS Setup Error]:", err));
          }
        },
      },
    ],
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
