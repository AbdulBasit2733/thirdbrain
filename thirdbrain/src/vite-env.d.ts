/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_BASEURL: string; // Add your environment variables here
    // Add more variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  
  