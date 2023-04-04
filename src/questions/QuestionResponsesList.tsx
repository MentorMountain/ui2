import QuestionResponsePost from "./QuestionResponsePost";
import { QuestionResponse } from "./Questions.model";

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
