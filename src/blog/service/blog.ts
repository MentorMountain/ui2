export const BLOG_API_ENDPOINTS = {
  HEALTH: "/api/blog/health",
  POSTS: "/api/blog",
  SUBMIT_POST: "/api/blog",
};

export interface BlogPostContent {
  date: number;
  title: string;
  content: string;
}

export interface BlogPost extends BlogPostContent {
  authorID: string;
}
