import axios, { AxiosError } from "axios";
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

function isBlogPostPropsValid(title: string, content: string) {
  const isTitleValid = 0 < title.length && title.length <= 150;
  const isContentValid = 0 < content.length && content.length <= 700;
  return isTitleValid && isContentValid;
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
  // Double check content restrictions again to reduce API calls
  title = title.trim();
  content = content.trim();
  if (!isBlogPostPropsValid(title, content)) {
    console.error("Blog post data invalid; won't make HTTP request");
    return {
      success: false,
      message: "Blog post data invalid",
    };
  }

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
      default: // Unknown API error
        return { success: false };
    }
  } catch (e) {
    console.error(e);
    if (!(e instanceof AxiosError) || !e.response) { // Unknown request error
      return { success: false };
    }

    switch (e.response.request.status) {
      case 400:
        return {
          success: false,
          message: "Invalid required information",
        };
      case 401:
        return {
          success: false,
          message: "User is not logged in",
        };
      case 403:
        return {
          success: false,
          message: "User is not a mentor",
        };
      default: // Unknown API error
        return { success: false };
    }
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
      default: // Unknown error
        return { success: false };
    }
  } catch (e) {
    console.error(e);
    if (!(e instanceof AxiosError) || !e.response) { // Unknown request error
      return { success: false };
    }

    switch (e.response.request.status) {
      case 400:
        return {
          success: false,
          message: "Invalid request",
        };
      case 401:
        return {
          success: false,
          message: "Invalid login credentials",
        };
      default: // Unknown API error
        return { success: false };
    }
  }
}
