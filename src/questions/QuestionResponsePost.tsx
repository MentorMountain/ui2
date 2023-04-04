import BlogPostInfoHeader from "../common/PostInfoHeader";
import { QuestionResponse } from "./Questions.model";

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
