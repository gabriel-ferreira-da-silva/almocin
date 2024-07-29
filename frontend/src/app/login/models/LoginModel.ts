// LoginModel.ts

export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string; // Token de autenticação retornado pelo servidor
    user: {
      id: string;
      username: string;
      email?: string;
    };
  }
  