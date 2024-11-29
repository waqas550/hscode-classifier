declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_USERNAME: string;
      ADMIN_PASSWORD: string;
      USER_USERNAME: string;
      USER_PASSWORD: string;
    }
  }
}

export {}; 