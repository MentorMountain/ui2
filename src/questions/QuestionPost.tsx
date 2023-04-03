import Image from "react-bootstrap/Image";

import { Question } from "./Questions.model";
import profilePicture from "../common/img/placeholderProfilePicture.png";
import { Button } from "react-bootstrap";

// Source: https://stackoverflow.com/questions/18679576/counting-words-in-string
// Source: https://speechify.com/blog/reading-time/
function calcTextReadTimeInMinutes(text: string): number {
  if (text) {
    const numOfWords = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(numOfWords / 200));
  } else {
    return -1;
  }
}

interface QuestionPostProps {
  question: Question;
  showQuestion: (question: Question) => void;
}

export default function QuestionPost({
  question,
  showQuestion,
}: QuestionPostProps) {
  const { authorID, content, date, title, id } = question;
  return (
    <article>
      <hr></hr>
      <header>
        <Image
          src={profilePicture}
          roundedCircle={true}
          width="50px"
          height="50px"
        />
        <div>
          <p className="author-name">{authorID}</p>
          <p className="post-info">
            {new Date(date).toLocaleDateString("en-CA")}{" "}
            <span className="bullet-point">•</span>&nbsp;
            {new Date(date).toLocaleTimeString("en-CA")}{" "}
            <span className="bullet-point">•</span>&nbsp;
            {calcTextReadTimeInMinutes(content)} min read{" "}
            <span className="bullet-point">•</span>&nbsp;
            {id ? id : "NEW POST! (Badge)"}
          </p>
        </div>
      </header>

      <section>
        <h2>Q: {title}</h2>
      </section>
      <section>
        <Button variant="dark" onClick={() => showQuestion(question)}>
          View Question
        </Button>
      </section>
    </article>
  );
}
