import { useState } from "react";
import { Button, Form, Modal, Spinner, Toast } from "react-bootstrap";
import { createBlogPostResponse } from "./service/BlogService";

export interface BlogPostInformationProps {
  title: string;
  content: string;
}

interface BlogPostCreatorProps {
  show: boolean;
  onShow: VoidFunction;
  onHide: VoidFunction;
  onSubmit: (props: BlogPostInformationProps) => Promise<createBlogPostResponse>;
}

const DEFAULT_TEXT = "";

export default function BlogPostCreator({
  show,
  onShow,
  onHide,
  onSubmit,
}: BlogPostCreatorProps) {
  // Title/Content handling
  const [title, setTitle] = useState<string>(DEFAULT_TEXT);
  const [content, setContent] = useState<string>(DEFAULT_TEXT);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isContentValid, setIsContentValid] = useState<boolean>(true);
  // Request processing
  const [isRequestProcessing, setIsRequestProcessing] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastTitle, setToastTitle] = useState<string>("");
  const [toastBody, setToastBody] = useState<string>("");

  const showModal = () => {
    // Clear pre-existing warnings & values since user hasn't started typing yet
    setIsTitleValid(true);
    setIsContentValid(true);
    setTitle(DEFAULT_TEXT);
    setContent(DEFAULT_TEXT);
    setShowToast(false);
    onShow();
  };

  const hideModal = () => {
    setTitle(DEFAULT_TEXT);
    setContent(DEFAULT_TEXT);
    onHide();
  };

  const submitPost = () => {
    if (checkTitleValidity(title) && checkContentValidity(content)) {
      setShowToast(false);
      setIsRequestProcessing(true);
      onSubmit({
        title: title.trim(),
        content: content.trim()
      }).then((submitResponse: createBlogPostResponse) => {
        setIsRequestProcessing(false);
        if (submitResponse.success) {
          hideModal();
        } else {
          setToastTitle("⛔ Blog Post Submission Error ⛔");
          setToastBody(submitResponse.message || "Unknown error");
          setShowToast(true);
        }
      });
    }
  };

  const checkTitleValidity = (title: string): boolean => {
    title = title.trim();
    const isTitleValid = 0 < title.length && title.length <= 150;

    return isTitleValid;
  };

  const checkContentValidity = (content: string): boolean => {
    content = content.trim();
    const isContentValid = 0 < content.length && content.length <= 700;

    return isContentValid;
  };

  const updateTitle = (text: string) => {
    setTitle(text);
    setIsTitleValid(checkTitleValidity(text));
  };

  const updateContent = (text: string) => {
    setContent(text);
    setIsContentValid(checkContentValidity(text));
  };

  return (
    <Modal show={show} onShow={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="blogForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              isInvalid={!isTitleValid}
              onChange={(e) => updateTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogForm.content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              style={{maxHeight: "225px"}}
              as="textarea"
              rows={5}
              isInvalid={!isContentValid}
              onChange={(e) => updateContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button
          style={{width: "76px"}}
          variant="primary"
          disabled={!checkTitleValidity(title) || !checkContentValidity(content) || isRequestProcessing}
          onClick={submitPost}>
          <Spinner
            className={isRequestProcessing ? "" : "visually-hidden"}
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className={isRequestProcessing ? "visually-hidden" : ""}>Submit</span>
        </Button>
      </Modal.Footer>

      <Toast style={{position: "fixed", left: "50%", bottom: "25px", marginLeft: "-174px"}}
             bg="light"
             onClose={() => setShowToast(false)}
             show={showToast}
             delay={4000}
             autohide>
        <Toast.Header>
          <strong className="me-auto">{toastTitle}</strong>
        </Toast.Header>
        <Toast.Body>{toastBody}</Toast.Body>
      </Toast>
    </Modal>
  );
}
