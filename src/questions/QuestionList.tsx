import { Question } from "./Questions.model";
import BlogPost from "./BlogPost";

interface BlogListProps {
  questionList: Question[];
}

export default function QuestionList({
  questionList,
}: BlogListProps) {
  return (
    <div>
      {
        questionList.map((blogPost) => (
          <BlogPost
            key={blogPost.id} // TODO-JAROD: Add support for local cache
            title={blogPost.title}
            content={blogPost.content}
            authorID={blogPost.authorID}
            date={blogPost.date}
            id={blogPost.id}
          />
        )) 
      }
    </div>
  );
}
