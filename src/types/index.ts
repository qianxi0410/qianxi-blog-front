/* eslint-disable camelcase */
export interface GitHubUserInfo {
  name: string;
  avatar: string;
  login: string;
}

export interface NullDate {
  Time: Date;
  Valid: boolean;
}

export interface NullString {
  String: string;
  Valid: boolean;
}

export interface Comment {
  content: string;
  login: string;
  name: string;
  post_id: number;
  created_at: Date;
  updated_at: Date;
  avatar: string;
  id: number;
}

export interface Post {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  description: NullString;
  pre: number;
  next: number;
  url: string;
  path: string;
  tags: NullString;
}

export interface Tocs {
  level: string;
  hook: string;
  title: string;
}

export interface PostWrapper {
  post: Post;
  next_title: string;
  pre_title: string;
  comments: Comment[];
}

export interface Color {
  alpha: number;
  hex: string;
  hexa: string;
  hsla: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  hue: number;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface Response<T> {
  code: number;
  msg: string;
  data: T;
}
