import axios from "axios";
import ENV from "../../env";

import { BlogPostData } from "./BlogPostData";

export interface createBlogPostResponse {
  success: boolean; // TODO-JAROD: 201    and    400                             and    403 are possible codes
  message?: string; // Question created    and    Invalid required information    and    Invalid user role
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
  jwt: string,
  title: string,
  content: string,
): Promise<createBlogPostResponse> {
  try {
    const requestURL = ENV.API_DOMAIN + "/api/blog";
    const requestData = { title, content };
    const requestHeaders = {
      headers: {
        Authorization: jwt
      }
    };

    const response = await axios.post(requestURL, requestData, requestHeaders);

    switch (response.status) {
      case 201:
        return {
          success: true,
          message: "Question created",
        };
      case 400:
        return {
          success: false,
          message: "Invalid required information",
        };
      case 403:
        return {
          success: false,
          message: "Invalid user role",
        };
      default: // Unknown error
        return { success: false };
    }
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}

// Get
export async function getBlogPosts(): Promise<getBlogPostsResponse> {
  // might need login context
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
