import { QuestionResponse } from "./Questions.model";
import BlogPostInfoHeader from '../blog/BlogPostInfoHeader';

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
      <BlogPostInfoHeader postID={id}
                          authorID={authorID}
                          date={date}
                          content={message} />
      <section>
        <h3>{message}</h3>
      </section>
    </article>
  );
}
