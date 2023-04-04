import { useCallback, useEffect, useState } from "react";
import { Button, Card, Form, Image, Modal } from "react-bootstrap";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { Question, QuestionResponse } from "./Questions.model";
import {
  getResponsesToQuestion,
  postResponseToQuestion,
} from "./service/QuestionsService";
import QuestionResponsesList from "./QuestionResponsesList";
import profilePicture from "../common/img/placeholderProfilePicture.png";

interface QuestionViewProps {
  show: boolean;
  onShow: VoidFunction;
  onHide: VoidFunction; //(isShowing: boolean) => void;
  //onSubmit: (props: string) => void;
  currentQuestion: Question;
}
const DEFAULT_TEXT = "";

export default function QuestionView({
  onHide,
  currentQuestion,
  show,
}: QuestionViewProps) {
  const closeQuestion = () => {
    onHide();
  };
  const { role } = useLoginContext();

  const [message, setMessage] = useState<string>(DEFAULT_TEXT);
  const [questionResponses, setQuestionsResponses] = useState<
    QuestionResponse[]
  >([]);
  const { jwt, username } = useLoginContext();

  const { authorID, content, date, title, id } = currentQuestion;
  console.log("THIS POSTS ID IS: " + id);

  const retrieveResponsesByQuestionId = useCallback(async () => {
    console.log("currentQuestion:" + currentQuestion);
    if (currentQuestion !== undefined) {
      getResponsesToQuestion(jwt, id!).then((responseInfo) => {
        if (!responseInfo) {
          setQuestionsResponses([]);
        }
        if (responseInfo.success && responseInfo.responses !== undefined) {
          //setQuestionsResponses(responseInfo.responses);
          const sortedQuestionResponses = responseInfo.responses.sort(
            (q1, q2) => {
              return q2.date - q1.date;
            }
          );
          setQuestionsResponses(sortedQuestionResponses);
        }
      });
    }
  }, [id, jwt, currentQuestion]);

  useEffect(() => {
    retrieveResponsesByQuestionId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentQuestion.id) {
    return <></>;
  }

  const updateMessage = (text: string) => {
    setMessage(text);
  };

  const submitPost = () => {
    if (checkMessageValidity(message)) {
      postResponseToQuestion(
        jwt,
        currentQuestion.id || "",
        username,
        message
      ).then(() => {
        retrieveResponsesByQuestionId();
        updateMessage("");
      });
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
    <Modal show={show} onHide={hideModal}>
      {currentQuestion !== undefined && (
        <>
          <Modal.Header closeButton onHide={closeQuestion}>
            <Modal.Title>Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div style={{width: "88%"}}>
                <h2 className="break-long-text">{title}</h2>
                <p className="break-long-text">{content}</p>
              </div>
              <div className="text-center">
                <Image
                  src={profilePicture}
                  roundedCircle={true}
                  width="40px"
                  height="40px"
                />
                <p className="mb-0">{authorID}</p>
              </div>
            </div>

            {role === "mentor" && (
              <>
                <hr />
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="questionResponseForm.content"
                  >
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={message}
                      onChange={(e) => updateMessage(e.target.value)}
                      placeholder="Your response"
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    disabled={!checkMessageValidity(message)}
                    onClick={submitPost}
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
            <QuestionResponsesList questionResponses={questionResponses} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </>
      )}
    </Modal>
  );
}
