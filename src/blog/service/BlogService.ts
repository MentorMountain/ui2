import axios from "axios";
import ENV from "../../env";

import { BlogPostData } from "./BlogPostData";

export interface createBlogPostResponse {
  success: boolean;
  message?: string;
}

export interface getBlogPostsResponse {
  success: boolean;
  message?: string;
  data?: BlogPostData[];
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

export async function getBlogPosts(jwt: string): Promise<getBlogPostsResponse> {
  try {
    const requestURL = ENV.API_DOMAIN + "/api/blog";
    const requestHeaders = {
      headers: {
        Authorization: jwt
      }
    };

    const response = await axios.get(requestURL, requestHeaders);

    switch (response.status) {
      case 200:
        return {
          success: true,
          message: "All blog posts",
          data: response.data,
        };
      case 400:
        return {
          success: false,
          message: "Invalid request",
        };
      default: // Unknown error
        return { success: false };
    }
  } catch (e) {
    console.error(e);
    return { success: false };
  }
}
