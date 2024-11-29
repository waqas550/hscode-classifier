export interface Dictionary {
  common: {
    username: string;
    password: string;
    login: string;
    logout: string;
    error: string;
  };
  login: {
    title: string;
    description: string;
    submit: string;
    error: string;
  };
  home: {
    title: string;
    description: string;
  };
  hsCode: {
    title: string;
    description: string;
    input: string;
    submit: string;
    result: string;
    error: string;
  };
} 