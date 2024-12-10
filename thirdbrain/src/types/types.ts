export interface Tag {
  _id: string;
  userId: string;
  title: string;
}

export interface ContentState {
  contents: Content[];
  isLoading: boolean;
}
export interface DataResponse {
  username: string;
  content: Content[];
}

export interface User {
  _id: string;
  username: string;
}

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export interface CreateContentData {
  title: string;
  link: string;
  type: ContentType;
  tagTitle: string;
}

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: ContentType;
  tags: Tag[];
  userId: User;
}

export interface InitialStateProps {
  isLoading: boolean;
  contents: Content[] | null;
}

export interface DeleteContentResponse {
  success: boolean;
  message: string;
  contentId?: string;
}

export interface User {
  _id: string;
  username: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export interface InitialStateProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export interface LoginUserArgs {
  username: string;
  password: string;
}

export interface RegisterUserArgs {
  username: string;
  password: string;
}
