
  
  export interface initialStateProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    username: string | null;
  }

  export interface AuthResponse {
    success: boolean;
    message?: string | Array<string>;
    username?: string | null;
}