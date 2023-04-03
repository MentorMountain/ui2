export const QUESTIONS_API_ENDPOINTS = {
  HEALTH: "/api/question/health",
  GET_QUESTIONS: "/api/questions",
  SEND_QUESTION: "/api/questions",
  //SEND_Q_RESPONSE: "/api/questions/:questionID/responses",
  //GET_Q_RESPONSES: "/api/questions/"+:questionID+"/responses",
};

export interface Question {
  id?: string;
  authorID: string;
  date: number;
  title: string;
  content: string;
}

export interface QuestionResponse {
  id?: string;
  questionID: string;
  authorID: string;
  date: number;
  message: string;
}
