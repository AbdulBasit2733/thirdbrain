declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        PORT:number;
        DATABASE_URL: string;
        USER_JWT_SECRET:string;
        FRONTEND_URL:string;
        NODE_ENV:string;
      }
    }
  }
  
  export {};
  