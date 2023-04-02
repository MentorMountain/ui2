import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { BlogPostProps } from "./BlogPost.model";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { createBlogPost,
         createBlogPostResponse,
         getBlogPosts,
         getBlogPostsResponse } from "./service/BlogService";
import "./blog.css";
import BlogList from "./BlogList";
import BlogPostCreator, { BlogPostInformationProps } from "./BlogPostCreator";

function blogPostDateComparator(left: BlogPostProps, right: BlogPostProps) {
  return right.date - left.date;
}

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
  // Modal visiblity functions
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const { jwt, username } = useLoginContext();

  const updateLocalBlogList = (username: string, title: string, content: string) => {
    // React requires a unique key for each visual element within a list of components
    // Additionally, this unique key should be consistent, not regenerated each display
    // Therefore, for performance reasons, LOCAL blog posts use creation date as key.
    const newBlogPost: BlogPostProps = {
      postID: JSON.stringify(Date.now()),
      authorID: username,
      date: Date.now(),
      title: title,
      content: content,
    };
    setBlogPosts([...blogPosts, newBlogPost].sort(blogPostDateComparator));
  };

  const submitBlogPost = async ({ title, content }: BlogPostInformationProps) => {
    await new Promise(r => setTimeout(r, 2000)); // TODO-JAROD: REMOVE TESTING SLEEP
    const response: createBlogPostResponse = await createBlogPost(jwt, title, content);
    if (response.success) {
      // The user-facing blog list is updated using local content to prevent...
      // ...re-querying the entire list of blogs for every new post made
      updateLocalBlogList(username, title, content);
    }
    return response;
  };

  const retrieveBlogPosts = async () => { // TODO-JAROD: REMOVE ASYNC WITH TESTING SLEEP
    setIsGettingBlogs(true);
    await new Promise(r => setTimeout(r, 2000)); // TODO-JAROD: REMOVE TESTING SLEEP
    getBlogPosts(jwt).then((responseInfo: getBlogPostsResponse) => {
      if (responseInfo.success && responseInfo.data !== undefined) {
        setBlogPosts(responseInfo.data.sort(blogPostDateComparator));
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
