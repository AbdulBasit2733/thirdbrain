export interface ContentProps {
  title: string | null;
  contentLink: string | null;
  contentType: string | null;
  tagTitle: string | null;
  tags?: Array<TagProps>;
  userId?: User;
  _id: string;
}

export interface TagProps {
  title: string | null;
}

export interface User {
  username: string | null;
}
