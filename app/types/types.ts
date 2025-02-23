export interface DataProps {
    id: string;
    title:string;
    type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE";
    url: string;
    tags: string[];
    notes: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    message: string;
    data: DataProps[];
  }
  
  export interface ContentType {
    type: "YOUTUBE" | "TWITTER" | "DOC" | "IMAGE" | "ALL";
  }