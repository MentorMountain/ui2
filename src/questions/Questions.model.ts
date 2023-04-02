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
