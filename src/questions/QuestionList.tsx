import { Question } from "./Questions.model";
import QuestionPost from "./QuestionPost";

interface BlogListProps {
  questionList: Question[];
  showQuestion: (question: Question) => void;
}

export default function QuestionList({
  questionList,
  showQuestion,
}: BlogListProps) {
  return (
    <div>
      {questionList.map((question, i) => (
        <QuestionPost question={question} showQuestion={showQuestion} />
      ))}
    </div>
  );
}
