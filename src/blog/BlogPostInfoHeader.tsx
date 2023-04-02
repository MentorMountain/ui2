import Image from 'react-bootstrap/Image'

// import { BlogPostProps } from "./BlogPost.model";
import profilePicture from './placeholderProfilePicture.png';
import { Badge } from 'react-bootstrap';
import { useLoginContext } from '../login/auth/LoginContextProvider';

interface BlogPostHeaderProps {
  postID?: string;
  authorID: string;
  date: number;
  content: string;
}

function getDateString(date: number): string {
  const dateObject: Date = new Date(date);
  const monthStrings: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day: number = dateObject.getDate();
  const month: string = monthStrings[dateObject.getUTCMonth()];
  const year: number = dateObject.getFullYear();
  return `${month} ${day}, ${year}`;
}

function getTimeString(date: number): string {
  // Receive string of the format `hh:mm:ss p.m.`
  let timeString: string = new Date(date).toLocaleTimeString("en-CA");
  // Create string of format `hh:mm p.m.`
  timeString = timeString.replace(/:[0-9]{2} /, " ");
  // Create string of format `hh:mm PM`
  timeString = timeString.replaceAll('.', "").toUpperCase();
  return timeString;
}

// Source: https://stackoverflow.com/questions/18679576/counting-words-in-string
// Source: https://speechify.com/blog/reading-time/
// Source: https://www.wyliecomm.com/2021/11/whats-the-best-length-of-a-word-online/
function getReadTimeString(text: string): string {
  if (!text) {
    console.error("Blog post text is undefined");
    return "0 min read";
  }

  const numOfWordsSource1Calc: number = text.trim().split(/\s+/).length;
  const numOfWordsSource2Calc: number = text.trim().length / 4.7;
  const readTimeInMinutes: number = ((numOfWordsSource1Calc / 200) + (numOfWordsSource2Calc / 200)) / 2;

  // If read time is 1+ minutes, display time in integer minutes
  if (readTimeInMinutes >= 1) {
    const roundedReadTime: number = Math.round(readTimeInMinutes);
    return `${roundedReadTime} min read`;
  } else { // Handle read time in seconds
    // Math.max used to ensure read time is never below 1 second
    const readTimeInSeconds: number = Math.max(1, Math.round(readTimeInMinutes * 60));
    return `${readTimeInSeconds} sec read`;
  }
}

function getPostIDString(postID: string | undefined): string {
  if (!postID) {
    console.error("Blog postID is undefined");
    return "PostID: Unknown";
  }

  return `PostID: ${postID.substring(0, 5)}...`;
}

export default function BlogPostInfoHeader({
    postID,
    authorID,
    date,
    content,
}: BlogPostHeaderProps) {
  const { username } = useLoginContext();
  const postMadeByCurrentUser: boolean = username === authorID;
  const dateText: string = getDateString(date);
  const timeText: string = getTimeString(date);
  const readTimeText: string = getReadTimeString(content);
  const postIDText: string = getPostIDString(postID);
  const isLocalCachedPost: boolean = (postID!.split('-')[0]) === "LC";

  return (
    <header>
      <Image src={profilePicture}
             roundedCircle={true}
             width="50px"
             height="50px"/>
      <div>
        <p className="author-name">
          {authorID}
          <span className={postMadeByCurrentUser ? "author-badge-parent" : "visually-hidden"}>
            <Badge pill bg="primary">✨ It's you! ✨</Badge>
          </span>
        </p>
        <p className="post-info">
          {dateText} <span className="bullet-point">•</span>&nbsp;
          {timeText} <span className="bullet-point">•</span>&nbsp;
          {readTimeText} <span className="bullet-point">•</span>&nbsp;
          <span className={isLocalCachedPost ? "visually-hidden" : ""}>
            {postIDText}
          </span>
          <span className={isLocalCachedPost ? "cache-badge-parent" : "visually-hidden"}>
            <Badge pill bg="secondary">Locally cached</Badge>
          </span>
        </p>
      </div>
    </header>
  );
}
