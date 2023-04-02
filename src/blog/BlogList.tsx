import { BlogPostProps } from "./BlogPost.model";
import BlogPost from "./BlogPost";
import { Spinner } from "react-bootstrap";

interface BlogListProps {
  isGettingBlogs: boolean;
  blogList: BlogPostProps[];
}

export default function BlogList({
  isGettingBlogs,
  blogList,
}: BlogListProps) {
  const shouldShowSpinner: boolean = isGettingBlogs;

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
