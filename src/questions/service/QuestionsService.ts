import axios from "axios";
import ENV from "../../env";

import { Question, QuestionResponse, QUESTIONS_API_ENDPOINTS } from "./question";

export interface postGeneric {
  success: boolean;
  message?: string;
}

export interface getQuestionIDs {
  success: boolean;
  message?: string;
  questionIDs?: string[];
}

export interface GetQuestion {
  success: boolean;
  message?: string;
  question?: Question;
}

export interface getQuestionResponses {
  success: boolean;
  message?: string;
  responses?: QuestionResponse[];
}

// export interface BlogPostData {
//   postID: string;
//   authorID: string;
//   date: number;
//   title: string;
//   content: string;
// }

// export interface Question {
//   id?: string;
//   authorID: string;
//   date: number;
//   title: string;
//   content: string;
// }

// export interface QuestionResponse {
//   id?: string;
//   questionID: string;
//   authorID: string;
//   date: number;
//   message: string;
// }

export async function questionsHealthEndpoint(): Promise<boolean> {
  try {
    return (
      (await axios.get(ENV.API_DOMAIN + "/api/questions/health")).status === 200
    );
  } catch {
    return false;
  }
}

//Post a question title and its content.
//Usable by: Students.
export async function postQuestion(
  jwt: string,
  title: string,
  content: string,
): Promise<postGeneric> {
  try {
    const requestURL = ENV.API_DOMAIN + QUESTIONS_API_ENDPOINTS.SEND_QUESTION;
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
      case 401:
        return {
          success: false,
          message: "Invalid login credentials",
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
    return {
      success: false,
      message: "Invalid required information",
    };
  }
}

//Get a question title and its content.
export async function getQuestion(
  jwt: string,
  questionID: string,
): Promise<GetQuestion> {
  try {
    const requestURL = ENV.API_DOMAIN + "/api/questions/"+questionID;
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
          message: "Question content successfully received",
          question:response.data,
        };
      case 400:
        return {
          success: false,
          message: "Invalid required information",
        };
      case 401:
        return {
          success: false,
          message: "Invalid login credentials",
        };
      case 403:
        return {
          success: false,
          message: "Invalid user role",
        };
      default: // Unknown error
        return { 
          success: false,
          message: response.status.toString(),
         };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Invalid required information",
    };
  }
}

//Get all question ids
export async function getQuestionIDs(jwt: string): Promise<getQuestionIDs> {
  try {
    const requestURL = ENV.API_DOMAIN + QUESTIONS_API_ENDPOINTS.GET_QUESTIONS;
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
          message: "All student-submitted questions",
          questionIDs: response.data,
        };
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
      default: // Unknown error
        return { success: false };
    }
  } catch (e) {
    console.error(e);
    return{
      success: false,
      message: "Invalid required information",
    };
  }
}

//Post a response to a given question.
//Usable by: Mentors.
export async function postResponseToQuestion(
  jwt: string,
  questionID:string,
  authorID: string,
  message: string,
): Promise<postGeneric> {
  try {
    const requestURL = ENV.API_DOMAIN + "/api/questions/"+questionID+"/responses";
    const requestData = { authorID, message };
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
          message: "Response created",
        };
      case 400:
        return {
          success: false,
          message: "Invalid required information",
        };
      case 401:
        return {
          success: false,
          message: "Invalid login credentials",
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
    return {
      success: false,
      message: "Invalid required information",
    };
  }
}

//Get all question responses for a given question
export async function getResponsesToQuestion(
  jwt: string,
  questionID:string
  ): Promise<getQuestionResponses> {
  try {
    const requestURL = ENV.API_DOMAIN + "/api/questions/"+questionID+"/responses";
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
          message: "All mentor responses to this question",
          responses: response.data,
        };
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
      default: // Unknown error
        return { success: false };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Invalid required information",
    };
  }
}