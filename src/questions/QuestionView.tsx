import { Modal } from "react-bootstrap";
import { Question } from "./Questions.model";
import { useLoginContext } from "../login/auth/LoginContextProvider";

interface QuestionViewProps {
  currentQuestion?: Question;
  showQuestion: (question: Question | undefined) => void;
}

export default function QuestionView({
  currentQuestion,
  showQuestion,
}: QuestionViewProps) {
  const closeQuestion = () => showQuestion(undefined);
  const { role } = useLoginContext();

  if (currentQuestion === undefined) {
    return <></>;
  }

  const { authorID, content, date, title, id } = currentQuestion;

  return (
    <Modal show={currentQuestion !== undefined}>
      {currentQuestion !== undefined && (
        <>
          <Modal.Header closeButton onHide={closeQuestion}>
            <Modal.Title>Q: {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{content}</p>
            {role === "mentor" && (
              <>
                <p>TODO MENTOR ONLY ACTION</p>
              </>
            )}
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}
