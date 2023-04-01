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
    <div>
      <Image src={profilePicture}
             roundedCircle={true}/>
      <p>title: {title} | content: {content} | authorUsername: {authorUsername} | creationTime: {creationTime} | postID : {postID ? postID : "unknown"}</p>
    </div>
  );
}
