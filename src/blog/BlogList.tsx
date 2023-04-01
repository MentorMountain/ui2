import { BlogPostProps } from "./BlogPost.model";
import BlogPost from "./BlogPost";

interface BlogListProps {
  blogList: BlogPostProps[];
}

export default function BlogList({
  blogList,
}: BlogListProps) {
  return (
    <div>
      {
        blogList.map((blogPost) => (
          <BlogPost
            title={blogPost.title}
            content={blogPost.content}
            authorUsername={blogPost.authorUsername}
            creationTime={blogPost.creationTime}
          />
        )) 
      }
    </div>
  );
}
