declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        DATABASE_URL: string;
        USER_JWT_SECRET:string
      }
    }
  }
  
  export {};
  