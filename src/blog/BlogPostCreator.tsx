import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export interface BlogPostInformationProps {
  title: string;
  content: string;
}

interface BlogPostCreatorProps {
  show: boolean;
  onHide: VoidFunction;
  onSubmit: (props: BlogPostInformationProps) => void;
}

const DEFAULT_TEXT = "";

export default function BlogPostCreator({
  show,
  onHide,
  onSubmit,
}: BlogPostCreatorProps) {
  const [title, setTitle] = useState<string>(DEFAULT_TEXT);
  const [content, setContent] = useState<string>(DEFAULT_TEXT);
  const [isValid, setIsValid] = useState<boolean>(false);

  const hideModal = () => {
    setTitle(DEFAULT_TEXT);
    setContent(DEFAULT_TEXT);
    onHide();
  };

  const isContentValid = (title: string, content: string) => {
    const minLengthValid = title.trim().length > 0 && content.trim().length > 0;

    return minLengthValid;
  };

  const updateTitle = (text: string) => {
    setTitle(text);
    setIsValid(isContentValid(text, content));
  };

  const updateContent = (text: string) => {
    setContent(text);
    setIsValid(isContentValid(title, text));
  };

  const submitPost = () => {
    if (isContentValid(title, content)) {
      onSubmit({ title, content });
    }
  };

  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="blogForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => updateTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogForm.content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => updateContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button disabled={!isValid} variant="primary" onClick={submitPost}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
