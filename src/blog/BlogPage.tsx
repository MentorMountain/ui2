import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { BlogPostProps } from "./BlogPost.model";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { createBlogPost, getBlogPosts, getBlogPostsResponse } from "./service/BlogService";
import "./blog.css";
import BlogList from "./BlogList";
import BlogPostCreator, { BlogPostInformationProps } from "./BlogPostCreator";

export default function BlogPage() {
  // Blog post & list handling
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPostProps[]>([]);
  // Request Processing
  const [isFreshPageLoad, setIsFreshPageLoad] = useState<boolean>(true);
  const [isGettingBlogs, setIsGettingBlogs] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastTitle, setToastTitle] = useState<string>("");
  const [toastBody, setToastBody] = useState<string>("");

  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const tempAddBlogPost = () => setBlogPosts([...blogPosts,
                                              { "title": "An Insightful Title About Meaningful Info",
                                                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a augue vel sapien aliquam malesuada. Integer id ligula vehicula, aliquet quam id, iaculis leo. Integer condimentum, sem eget mattis pretium, nisi nibh tempor arcu, nec finibus augue lacus sed odio. Phasellus convallis sagittis fringilla. Pellentesque a semper justo. Sed porta felis ac lacus vestibulum, vitae laoreet ante vulputate. Suspendisse ullamcorper, nisl tristique ornare sagittis, quam dolor efficitur sem, quis bibendum felis elit vitae neque. Pellentesque sagittis lacus at purus porttitor, nec pretium magna volutpat. Sed facilisis condimentum ligula, ut ullamcorper lorem molestie ut. Sed sit amet metus tellus. Nam velit.",
                                                "authorID": "gamer",
                                                "date": Date.now(),
                                                "postID": "placeholder"}
                                             ]); // TODO-JAROD: REMOVE

  const { jwt } = useLoginContext();

  const submitBlogPost = async ({ title, content }: BlogPostInformationProps) => {
    await new Promise(r => setTimeout(r, 2000)); // TODO-JAROD: REMOVE TESTING SLEEP
    return await createBlogPost(jwt, title, content);
  };

  const retrieveBlogPosts = async () => { // TODO-JAROD: Remove async with sleep
    setIsGettingBlogs(true);
    await new Promise(r => setTimeout(r, 2000)); // TODO-JAROD: REMOVE TESTING SLEEP
    getBlogPosts(jwt).then((responseInfo: getBlogPostsResponse) => {
      if (responseInfo.success && responseInfo.data !== undefined) {
        setBlogPosts(responseInfo.data);
      } else {
        setToastTitle("⛔ Blog List Retrieval Error ⛔");
        setToastBody(responseInfo.message || "Unknown error");
        setShowToast(true);
      }
      setIsFreshPageLoad(false);
      setIsGettingBlogs(false);
    });
  };

  // Load blog list automatically upon page load
  if (isFreshPageLoad && !isGettingBlogs) {
    retrieveBlogPosts();
  }

  return (
    <div className="blog-container">
      <Button onClick={showModal}>Create Blog Post</Button>
      <BlogPostCreator
        show={showPostCreator}
        onShow={showModal}
        onSubmit={submitBlogPost}
        onHide={hideModal}
      />
      <BlogList
        isGettingBlogs={isGettingBlogs}
        blogList={blogPosts}
      />
      <Toast style={{position: "fixed", right: 1, top: 1}}
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
    </div>
  );
}
