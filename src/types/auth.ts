export interface User {
    id: string;
    username: string;
    password: string;
    name: string;
    role: 'admin' | 'user';
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }