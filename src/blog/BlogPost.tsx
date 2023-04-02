import Image from 'react-bootstrap/Image'

import { BlogPostProps } from "./BlogPost.model";
import profilePicture from './placeholderProfilePicture.png';

// Source: https://stackoverflow.com/questions/18679576/counting-words-in-string
// Source: https://speechify.com/blog/reading-time/
function calcTextReadTimeInMinutes(text: string): number {
  if (text) {
    const numOfWords = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(numOfWords / 200));
  } else {
    console.error("Blog post text is undefined");
    return 0;
  }
}

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
      <header>
        <Image src={profilePicture}
               roundedCircle={true}
               width="50px"
               height="50px"/>
        <div>
          <p className="author-name">{authorID}</p>
          <p className="post-info">
            {new Date(date).toLocaleDateString("en-CA")} <span className="bullet-point">•</span>&nbsp;
            {new Date(date).toLocaleTimeString("en-CA")} <span className="bullet-point">•</span>&nbsp;
            {calcTextReadTimeInMinutes(content)} min read <span className="bullet-point">•</span>&nbsp;
            {postID ? postID : "NEW POST! (Badge)"}
          </p>
        </div>
      </header>
      
      <section>
        <h2>{title}</h2>
        <p>{content}</p>
      </section>
    </article>
  );
}
