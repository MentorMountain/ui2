import { BlogPostProps } from "./BlogPost.model";

export default function BlogPost({
    title,
    content,
    authorUsername,
    creationTime,
    postID,
}: BlogPostProps) {
  return (
    <div>
      <p>title: {title} | content: {content} | authorUsername: {authorUsername} | creationTime: {creationTime} | postID : {postID ? postID : "unknown"}</p>
    </div>
  );
}
