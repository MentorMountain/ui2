import { useState } from "react";
import { Button } from "react-bootstrap";
import { BlogPost } from "./BlogPost";
import BlogList from "./BlogList";
import BlogPostCreator, { BlogPostInformationProps } from "./BlogPostCreator";

export default function BlogPage() {
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(
    [
      {"title": "post-1", "content": "lelelelelelee"},
      {"title": "post-2", "content": "lelelelelelee"},
      {"title": "post-3", "content": "lelelelelelee"},
      {"title": "post-4", "content": "lelelelelelee"},
    ]
  );
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const submitBlogPost = ({ title, content }: BlogPostInformationProps) => {
    // TODO-JAROD: create an HTML call with onSuccess and onError and execute it 
    console.info(`BUTTON PRESSED WITH THE FOLLOWING DATA: title=${title}, content=${content}`);
    hideModal();
  };

  return (
    <>
      <h1>Blog</h1>
      <Button onClick={showModal}>Create Blog Post</Button>
      <BlogPostCreator
        show={showPostCreator}
        onShow={showModal}
        onSubmit={submitBlogPost}
        onHide={hideModal}
      />
      <BlogList
        blogList={blogPosts}
      />
    </>
  );
}
