import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __GOOGLE_API_KEY__: JSON.stringify(env.VITE_GOOGLE_AI_API_KEY),
      'process.env.VITE_GOOGLE_AI_API_KEY': JSON.stringify(env.VITE_GOOGLE_AI_API_KEY),
      'import.meta.env.VITE_GOOGLE_AI_API_KEY': JSON.stringify(env.VITE_GOOGLE_AI_API_KEY),
    },
    envPrefix: ['VITE_']
  };
});