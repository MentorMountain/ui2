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
