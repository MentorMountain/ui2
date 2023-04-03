import { Question } from "./Questions.model";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {postResponseToQuestion} from "./service/QuestionsService";

interface QuestionViewProps {
  show: boolean;
  onShow: VoidFunction;
  onHide: VoidFunction;//(isShowing: boolean) => void;
  //onSubmit: (props: string) => void;
  currentQuestion?: Question;
  showQuestion: (question: Question | undefined) => void;
}
const DEFAULT_TEXT = "";

export default function QuestionView({
  onHide,
  currentQuestion,
  showQuestion,
}: QuestionViewProps) {
  const closeQuestion = () => {
    showQuestion(undefined);
    onHide();
  }
  const { role } = useLoginContext();

  const [message, setMessage] = useState<string>(DEFAULT_TEXT);
  const [isMessageValid, setIsMessageValid] = useState<boolean>(true);
  const { jwt, username } = useLoginContext();

  if (currentQuestion === undefined) {
    return <></>;
  }

  const { authorID, content, date, title, id } = currentQuestion;

  const updateMessage = (text: string) => {
    setMessage(text);
    setIsMessageValid(checkMessageValidity(text));
  };

  const submitPost = () => {
    if (checkMessageValidity(message)) {
      postResponseToQuestion(
        jwt,
        currentQuestion.id || "",
        username,
        message,
      )
    }
  };

  const checkMessageValidity = (message: string): boolean => {
    message = message.trim();
    const isContentValid = 0 < message.length && message.length <= 700;
    return isContentValid;
  };

  const hideModal = () => {
    setMessage(DEFAULT_TEXT);
    onHide();
  };

  return (
    <Modal show={currentQuestion !== undefined} onHide={hideModal}>
      {currentQuestion !== undefined && (
        <>
          <Modal.Header closeButton onHide={closeQuestion}>
            <Modal.Title>Q: {title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{content}</p>
            {role === "mentor" && (
              <>
                {/* <p>TODO MENTOR ONLY ACTION</p> */}
                <Form>
                  <Form.Group className="mb-3" controlId="blogForm.content">
                    <Form.Label>Response Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      isInvalid={!isMessageValid}
                      onChange={(e) => updateMessage(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={ !checkMessageValidity(message)}
          onClick={submitPost}>
          Submit
        </Button>
      </Modal.Footer>
              </>
      )}
    </Modal.Body>
        </>
      )
}
    </Modal >
  );
}
