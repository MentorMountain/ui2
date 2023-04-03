import Image from "react-bootstrap/Image";

import { Question } from "./Questions.model";
import profilePicture from "../common/img/placeholderProfilePicture.png";
import { Button, Container } from "react-bootstrap";

interface QuestionPostProps {
  id: string;
  question: Question;
  showQuestion: (question: Question) => void;
}

export default function QuestionPost({
  id,
  question,
  showQuestion,
}: QuestionPostProps) {
  const { authorID, content, date, title } = question;
  return (
    <Container>
      <hr />

      <div className="d-flex justify-content-between">
        <div>
          <h2>{title}</h2>
          <p className="post-info">
            {new Date(date).toLocaleDateString("en-CA")}{" "}
            <span className="bullet-point">-</span>&nbsp;
            {new Date(date).toLocaleTimeString("en-CA")}{" "}
          </p>

          <Button variant="dark" onClick={() => showQuestion(question)}>
            View
          </Button>
        </div>
        <div className="text-center">
          <Image
            src={profilePicture}
            roundedCircle={true}
            width="50px"
            height="50px"
          />
          <p className="author-name">{authorID}</p>
        </div>
      </div>
    </Container>
  );
}
