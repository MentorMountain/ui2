import { BlogPostProps } from "./BlogPost.model";
import BlogPost from "./BlogPost";
import { Spinner } from "react-bootstrap";
import { useLoginContext } from "../login/auth/LoginContextProvider";

interface BlogListProps {
  isGettingBlogs: boolean;
  blogList: BlogPostProps[];
}

export default function BlogList({
  isGettingBlogs,
  blogList,
}: BlogListProps) {
  const shouldShowSpinner: boolean = isGettingBlogs;
  const listLoadedEmpty: boolean = !isGettingBlogs && blogList.length === 0;

  const { role } = useLoginContext();

  return (
    <div className="blog-list">
      <hr className={shouldShowSpinner ? "" : "visually-hidden"}/>
      <div className="blog-list-spinner-container">
        <Spinner
          className={shouldShowSpinner ? "" : "visually-hidden"}
          as="span"
          variant="primary"
          animation="grow"
          role="status"
          aria-hidden="true"
        />
      </div>
      <hr className={listLoadedEmpty ? "" : "visually-hidden"}></hr>
      <p className={(listLoadedEmpty && role === "student") ? "empty-list-text" : "visually-hidden"}>
        Whoops! Seems like there's no posts at the moment!<br/>
        Try again a bit later after our mentors have had a chance to add some knowledge! 🙂
      </p>
      <p className={(listLoadedEmpty && role === "mentor") ? "empty-list-text" : "visually-hidden"}>
        Hey Mentors! Any blog posts you create will show up down here!<br/>
        Get started helping students by hitting the button above to contribute some experiences! 👍
      </p>
      {
        blogList.map((blogPost) => (
          <BlogPost
            key={blogPost.postID} // TODO-JAROD: Add support for local cache
            title={blogPost.title}
            content={blogPost.content}
            authorID={blogPost.authorID}
            date={blogPost.date}
            postID={blogPost.postID}
          />
        )) 
      }
    </div>
  );
}
