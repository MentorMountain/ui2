import { Question } from "./Questions.model";
import QuestionPost from "./QuestionPost";
import { Spinner } from "react-bootstrap";
import { useLoginContext } from "../login/auth/LoginContextProvider";

interface QuestionListProps {
  shouldShowSpinner: boolean;
  questionList: Question[];
  showQuestion: (question: Question) => void;
}

export default function QuestionList({
  shouldShowSpinner,
  questionList,
  showQuestion,
}: QuestionListProps) {
  const { role, username } = useLoginContext();
  return (
    <div>
    <hr className={shouldShowSpinner ? "" : "visually-hidden"}/>
    <div className="blog-list-spinner-container">
        <Spinner
          className={shouldShowSpinner ? "" : "visually-hidden"}
          as="span"
          variant="primary"
          animation="grow"
          role="status"
          aria-hidden="true"
        />
      </div>
      <hr className={(questionList.length < 1 && !shouldShowSpinner)? "" : "visually-hidden"}></hr>
      <p className={(questionList.length < 1 && !shouldShowSpinner && role === "student") ? "empty-list-text" : "visually-hidden"}>
        Hello {username} ! Any blog posts you create will show up down here!!<br/>
        Get started helping students by hitting the button above to contribute some experiences! 👍
        
      </p>
      <p className={(questionList.length < 1 && !shouldShowSpinner && role === "mentor") ? "empty-list-text" : "visually-hidden"}>
        Hey Mentors! Seems like there's no questions at the moment<br/>
        Check again a bit later after our students have had a chance to ask some questions! 🙂
      </p>
    
      {questionList.map((question, i) => (
        <QuestionPost question={question} showQuestion={showQuestion} key={i} id={(i+1).toString()} />
      ))}
    </div>
  );
}
