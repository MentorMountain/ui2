import { Spinner } from "react-bootstrap";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { QuestionResponse } from "./Questions.model";
import QuestionResponsePost from "./QuestionResponsePost";

interface QuestionResponseListProps {
  questionResponses: QuestionResponse[];
}

export default function BlogList({
  questionResponses
}: QuestionResponseListProps) {

  const { role, username } = useLoginContext();

  return (
    <div className="response-list">

      {/* <hr className={shouldShowSpinner ? "" : "visually-hidden"}/>
      <div className="blog-list-spinner-container">
        <Spinner
          className={shouldShowSpinner ? "" : "visually-hidden"}
          as="span"
          variant="primary"
          animation="grow"
          role="status"
          aria-hidden="true"
        />
      </div>  */}
      {
        questionResponses.map((questionResponse) => (
          <QuestionResponsePost
            key={questionResponse.id}
            message={questionResponse.message}
            authorID={questionResponse.authorID}
            date={questionResponse.date}
            id={questionResponse.id}
            questionID={questionResponse.questionID}
          />
        )) 
      }
    </div>
  );
}
