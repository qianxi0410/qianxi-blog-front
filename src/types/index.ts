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
  deleted_at: NullDate;
  id: number;
}

export interface Post {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: NullDate;
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
