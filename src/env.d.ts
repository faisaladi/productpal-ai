/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENROUTER_API_KEY: string;
  readonly VITE_GOOGLE_AI_API_KEY: string;

  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}