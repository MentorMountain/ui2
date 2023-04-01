import Image from 'react-bootstrap/Image'

import { BlogPostProps } from "./BlogPost.model";
import profilePicture from './placeholderProfilePicture.png';

// Source: https://stackoverflow.com/questions/18679576/counting-words-in-string
// Source: https://speechify.com/blog/reading-time/
function calcTextReadTimeInMinutes(text: string): number {
  const numOfWords = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(numOfWords / 200));
}

export default function BlogPost({
    title,
    content,
    authorUsername,
    creationTime,
    postID,
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
          <p className="author-name">{authorUsername}</p>
          <p className="post-info">
            {new Date(creationTime).toLocaleDateString("en-CA")} <span className="bullet-point">•</span>&nbsp;
            {new Date(creationTime).toLocaleTimeString("en-CA")} <span className="bullet-point">•</span>&nbsp;
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
