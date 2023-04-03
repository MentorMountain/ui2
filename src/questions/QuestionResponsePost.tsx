import { QuestionResponse } from "./Questions.model";
import BlogPostInfoHeader from "../common/PostInfoHeader";

export default function QuestionResponsePost({
  id,
  authorID,
  date,
  questionID,
  message,
}: QuestionResponse) {
  return (
    <article>
      <hr></hr>
      <BlogPostInfoHeader
        postID={id}
        authorID={authorID}
        date={date}
        content={message}
      />
      <p className="m-2">{message}</p>
    </article>
  );
}
