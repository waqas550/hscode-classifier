declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ADMIN_USERNAME: string;
      NEXT_PUBLIC_ADMIN_PASSWORD: string;
      NEXT_PUBLIC_USER_USERNAME: string;
      NEXT_PUBLIC_USER_PASSWORD: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

export {}; 