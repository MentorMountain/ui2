import { useState } from "react";
import { Button } from "react-bootstrap";
import { BlogPostProps } from "./BlogPost.model";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { createBlogPost, getBlogPosts } from "./service/BlogService";
import "./blog.css";
import BlogList from "./BlogList";
import BlogPostCreator, { BlogPostInformationProps } from "./BlogPostCreator";

export default function BlogPage() {
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPostProps[]>([]);
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const tempAddBlogPost = () => setBlogPosts([...blogPosts,
                                              { "title": "An Insightful Title About Meaningful Info",
                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a augue vel sapien aliquam malesuada. Integer id ligula vehicula, aliquet quam id, iaculis leo. Integer condimentum, sem eget mattis pretium, nisi nibh tempor arcu, nec finibus augue lacus sed odio. Phasellus convallis sagittis fringilla. Pellentesque a semper justo. Sed porta felis ac lacus vestibulum, vitae laoreet ante vulputate. Suspendisse ullamcorper, nisl tristique ornare sagittis, quam dolor efficitur sem, quis bibendum felis elit vitae neque. Pellentesque sagittis lacus at purus porttitor, nec pretium magna volutpat. Sed facilisis condimentum ligula, ut ullamcorper lorem molestie ut. Sed sit amet metus tellus. Nam velit.",
                                                "authorUsername": "gamer",
                                                "creationTime": Date.now() }
                                             ]); // TODO-JAROD: REMOVE

  const { jwt } = useLoginContext();

  const submitBlogPost = ({ title, content }: BlogPostInformationProps) => {
    // TODO-JAROD: create an HTML call with onSuccess and onError and execute it 
    console.info(`BUTTON PRESSED WITH THE FOLLOWING DATA: title=${title}, content=${content}`);
    createBlogPost(jwt, title, content).then((_) => console.log("done post!"));
    getBlogPosts(jwt).then((_) => console.log("done get!"));
    hideModal();
  };

  return (
    <div className="blog-container">
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
    </div>
  );
}
