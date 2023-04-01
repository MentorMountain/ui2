import Image from 'react-bootstrap/Image'

import { BlogPostProps } from "./BlogPost.model";
import profilePicture from './placeholderProfilePicture.png';

export default function BlogPost({
    title,
    content,
    authorUsername,
    creationTime,
    postID,
}: BlogPostProps) {
  return (
    <article>
      <header>
        <Image src={profilePicture}
              roundedCircle={true}/>
        <p>authorUsername: {authorUsername} | creationTime: {creationTime} | postID : {postID ? postID : "unknown"}</p>
      </header>
      <section>
        <h2>title: {title}</h2>
        <p>content: {content}</p>
      </section>
    </article>
  );
}
