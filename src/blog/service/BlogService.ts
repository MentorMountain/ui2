import axios from "axios";
import ENV from "../../env";

import { BlogPostData } from "./BlogPostData";

export interface createBlogPostResponse {
  success: boolean; // TODO-JAROD: 201    and    400                             and    401 are possible codes
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
  username: string,
  title: string,
  content: string,
): Promise<createBlogPostResponse> {
  try {
    const user = {
      "username": username,
      "role": "mentor"
    };
    const response = await axios.post(
      ENV.API_DOMAIN + "/api/blog",
      {
        user,
        title,
        content,
      },
      {
        headers: {
          Authorization: jwt
        }
      }
    );

    console.log(response);
    return { success: false };
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
