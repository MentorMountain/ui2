import axios from "axios";
import ENV from "../../env";

import { BlogPostData } from "./BlogPostData";

export interface createBlogPostResponse {
  success: boolean; // TODO-JAROD: 201    and    400                             and    401 are possible codes
  message: string; // Question created    and    Invalid required information    and    Invalid user role
}

export interface getBlogPostsResponse {
  success: boolean; // TODO-JAROD: 200    and    400
  message: string; // All question IDs    and    Invalid request
  data: BlogPostData[]; // Blog posts
}

export async function blogHealthEndpoint(): Promise<boolean> {
  try {
    return (
      (await axios.get(ENV.API_DOMAIN + "/api/blog/health")).status === 200
    );
  } catch {
    return false;
  }
}

// Create
export async function createBlogPost(
  title: string,
  content: string,
): Promise<createBlogPostResponse> {
  // user login context in here
  return {
    success: true,
    message: "placeholder",
  } as createBlogPostResponse;
}

// Get
export async function getBlogPosts(): Promise<getBlogPostsResponse> {
  // no need for loing context

  return {
    success: true,
    message: "placeholder",
    data: [{
      postID: "placeholder",
      authorID: "placeholder",
      date: Date.now(),
      title: "placeholder",
      content: "placeholder",
    }],
  } as getBlogPostsResponse;
}
