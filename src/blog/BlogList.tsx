import { BlogPost } from "./BlogPost";

interface BlogListProps {
  blogList: BlogPost[];
}

export default function BlogList({
  blogList,
}: BlogListProps) {
  return (
    <div>
      <p>lelelelelelelele</p>
      { blogList.map((blogPost) => (
        <p>Title: {blogPost.title} | Content: {blogPost.content}</p>
      )) }
    </div>
  );
}
