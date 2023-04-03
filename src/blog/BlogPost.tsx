import { BlogPostProps } from "./BlogPost.model";
import BlogPostInfoHeader from './BlogPostInfoHeader';

export default function BlogPost({
    postID,
    authorID,
    date,
    title,
    content,
}: BlogPostProps) {
  return (
    <article>
      <hr></hr>
      <BlogPostInfoHeader postID={postID}
                          authorID={authorID}
                          date={date}
                          content={content} />
      <section>
        <h2>{title}</h2>
        <p>{content}</p>
      </section>
    </article>
  );
}
