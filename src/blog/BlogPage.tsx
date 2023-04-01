import { useState } from "react";
import { Button } from "react-bootstrap";
import { BlogPostProps } from "./BlogPost.model";
import BlogList from "./BlogList";
import BlogPostCreator, { BlogPostInformationProps } from "./BlogPostCreator";

export default function BlogPage() {
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPostProps[]>([]);
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const tempAddBlogPost = () => setBlogPosts([...blogPosts,
                                              { "title": "new title",
                                                "content": "new content",
                                                "authorUsername": "gamer",
                                                "creationTime": Date.now() }
                                             ]); // TODO-JAROD: REMOVE

  const submitBlogPost = ({ title, content }: BlogPostInformationProps) => {
    // TODO-JAROD: create an HTML call with onSuccess and onError and execute it 
    console.info(`BUTTON PRESSED WITH THE FOLLOWING DATA: title=${title}, content=${content}`);
    hideModal();
  };

  return (
    <>
      <Button onClick={showModal}>Create Blog Post</Button>
      <hr></hr>
      <Button onClick={tempAddBlogPost}>Dummy Add</Button>
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
