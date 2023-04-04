import { Spinner } from "react-bootstrap";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { QuestionResponse } from "./Questions.model";
import QuestionResponsePost from "./QuestionResponsePost";

interface QuestionResponseListProps {
  questionResponses: QuestionResponse[];
}

export default function QuestionResponsesList({
  questionResponses,
}: QuestionResponseListProps) {
  return (
    <div className="response-list">
      {questionResponses.map((questionResponse, i) => (
        <QuestionResponsePost
          key={questionResponse.id}
          message={questionResponse.message}
          authorID={questionResponse.authorID}
          date={questionResponse.date}
          id={(i + 1).toString()}
          questionID={questionResponse.questionID}
        />
      ))}
    </div>
  );
}
