declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      MONGODB_USER: string;
      MONGODB_PASSWORD: string;
      MONGODB_URI: string;
    }
  }
}

export {};
