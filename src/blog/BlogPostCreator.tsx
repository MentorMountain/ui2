import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export interface BlogPostInformationProps {
  title: string;
  content: string;
}

interface BlogPostCreatorProps {
  show: boolean;
  onShow: VoidFunction;
  onHide: VoidFunction;
  onSubmit: (props: BlogPostInformationProps) => void;
}

const DEFAULT_TEXT = "";

export default function BlogPostCreator({
  show, // TODO-JAROD: on-show to set isTitleValid and isContentValid to true
  onShow,
  onHide,
  onSubmit,
}: BlogPostCreatorProps) {
  const [title, setTitle] = useState<string>(DEFAULT_TEXT);
  const [content, setContent] = useState<string>(DEFAULT_TEXT);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isContentValid, setIsContentValid] = useState<boolean>(true);

  const showModal = () => {
    // Clear pre-existing warnings since user hasn't started typing yet
    setIsTitleValid(true);
    setIsContentValid(true);
    setTitle(DEFAULT_TEXT);
    setContent(DEFAULT_TEXT);
    onShow();
  };

  const hideModal = () => {
    setTitle(DEFAULT_TEXT);
    setContent(DEFAULT_TEXT);
    onHide();
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

  const submitPost = () => {
    if (checkTitleValidity(title) && checkContentValidity(content)) {
      onSubmit({ title, content });
    }
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
          variant="primary"
          disabled={!checkTitleValidity(title) || !checkContentValidity(content)}
          onClick={submitPost}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
