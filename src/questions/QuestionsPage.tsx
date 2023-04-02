
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Question, QuestionResponse } from "./Questions.model";
//import { Question, QuestionResponse } from "./service/question.ts";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { getResponsesToQuestion, postResponseToQuestion, getQuestions, postQuestion } from "./service/QuestionsService";
import "./blog.css";
import QuestionList from "./QuestionList";
import QuestionCreator, { BlogPostInformationProps } from "./QuestionCreator";

export default function QuestionsPage() {
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [questions, setBlogPosts] = useState<Question[]>([]);
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const tempAddBlogPost = () => setBlogPosts([...questions,
  {
    "title": "An Insightful Question Title About Meaningful Info",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a augue vel sapien aliquam malesuada. Integer id ligula vehicula, aliquet quam id, iaculis leo. Integer condimentum, sem eget mattis pretium, nisi nibh tempor arcu, nec finibus augue lacus sed odio. Phasellus convallis sagittis fringilla. Pellentesque a semper justo. Sed porta felis ac lacus vestibulum, vitae laoreet ante vulputate. Suspendisse ullamcorper, nisl tristique ornare sagittis, quam dolor efficitur sem, quis bibendum felis elit vitae neque. Pellentesque sagittis lacus at purus porttitor, nec pretium magna volutpat. Sed facilisis condimentum ligula, ut ullamcorper lorem molestie ut. Sed sit amet metus tellus. Nam velit.",
    "authorID": "Benjamin the",
    "date": Date.now(),
    "id": "placeholder"
  }
  ]); // TODO-BEN: REMOVE

  const { jwt } = useLoginContext();

  const submitQuestion = ({ title, content }: BlogPostInformationProps) => {
    // TODO-JAROD: create an HTML call with onSuccess and onError and execute it 
    console.info(`BUTTON PRESSED WITH THE FOLLOWING DATA: title=${title}, content=${content}`);
    postQuestion(jwt, title, content).then((_) => console.log("done posting question!"));
    getQuestions(jwt).then((_) => console.log("done get!"));
    hideModal();
  };

  const retrieveBlogPosts = () => {
    getQuestions(jwt).then((responseInfo) => {
      if (responseInfo.success && responseInfo.questions !== undefined) {
        setBlogPosts(responseInfo.questions);
      }
    });
  };

  return (
    <div className="blog-container">
      <Button onClick={showModal}>Create Blog Post</Button>
      <hr></hr>
      <Button onClick={tempAddBlogPost}>Dummy Add</Button>
      <Button onClick={retrieveBlogPosts}>Trigger Get</Button>
      <QuestionCreator
        show={showPostCreator}
        onShow={showModal}
        onSubmit={submitQuestion}
        onHide={hideModal}
      />
      <QuestionList
        questionList={questions}
      />
    </div>
  );
}
