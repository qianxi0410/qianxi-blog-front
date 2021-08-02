export type GitHubUserInfo = {
  name: string;
  avatar: string;
  login: string;
};

export type Comment = {
  content: string;
  login: string;
  name: string;
  postId: number;
};
