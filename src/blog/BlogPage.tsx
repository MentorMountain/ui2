import { useState } from "react";
import { Button } from "react-bootstrap";
import BlogPostCreator, { BlogPostInformationProps } from "./BlogPostCreator";

export default function BlogPage() {
  const [showPostCreator, setShowPostCreator] = useState(false);
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const submitBlogPost = ({ title, content }: BlogPostInformationProps) => {
    hideModal();
  };

  return (
    <>
      <h1>Blog</h1>
      <Button onClick={showModal}>Create Blog Post</Button>
      <BlogPostCreator
        show={showPostCreator}
        onSubmit={submitBlogPost}
        onHide={hideModal}
      />
    </>
  );
}
