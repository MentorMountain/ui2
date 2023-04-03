import { Modal } from "react-bootstrap";
import { Question } from "./Questions.model";

interface QuestionViewProps {
  currentQuestion?: Question;
  showQuestion: (question: Question | undefined) => void;
}

export default function QuestionView({
  currentQuestion,
  showQuestion,
}: QuestionViewProps) {
  const closeQuestion = () => showQuestion(undefined);
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
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}
