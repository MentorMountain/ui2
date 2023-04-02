
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Question, QuestionResponse } from "./Questions.model";
//import { Question, QuestionResponse } from "./service/question.ts";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { getResponsesToQuestion, postResponseToQuestion, getQuestion, getQuestionIDs, postQuestion } from "./service/QuestionsService";
import "./blog.css";
import QuestionList from "./QuestionList";
import QuestionCreator, { BlogPostInformationProps } from "./QuestionCreator";

export default function QuestionsPage() {
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [questionIDs, setQuestionIDs] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const showModal = () => setShowPostCreator(true);
  const hideModal = () => setShowPostCreator(false);

  const tempAddBlogPost = () => setQuestions([...questions,
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
    getQuestionIDs(jwt).then((_) => console.log("done get of IDs!"));
    retrieveQuestions().then((_) => console.log("done get of questions!"));
    hideModal();
  };

  // function loadQuestionData() {
  //   INITIAL_QUESTION_IDS.forEach((id, index) => {
  //     const XHR = new XMLHttpRequest();
  
  //     XHR.addEventListener("load", (response) => {
  //       if (XHR.status === 200) {
  //         let question = JSON.parse(XHR.response);
  //         question.id = id;
  //         console.log(question)
  
  //         QUESTIONS.push(question);
  
  //         questionListStatus.textContent = "Questions get success";
  //         questionListStatus.style.color = "green";
  //         // console.log("Questions get success");
  //         renderQuestionList();
  
  //       } else {
  //         questionListStatus.textContent = `Questions get failed`;
  //         questionListStatus.style.color = "red";
  //         // console.error("Questions get failed");
  //       }
  //     });
  
  //     XHR.addEventListener("error", (event) => {
  //       questionListStatus.textContent = `Failure: ${event}`;
  //       questionListStatus.style.color = "red";
  //       console.error("Oops! Something went wrong.");
  //     });
  
  //     XHR.open("GET", GATEWAY_URL + "/api/questions/" + id);
  
  //     console.log('Getting Question');
  //     questionListStatus.textContent = `Processing...`;
  //     questionListStatus.style.color = "black";
  //     XHR.send();
  //   })
  //   console.log(QUESTIONS)
  //   console.log('Done getting questions');
  // }
  // const executeLongRunningTask = async (url) => {
  //   return await fetch(url).then(response => response.json());
  // }

  // export interface getQuestion {
  //   success: boolean;
  //   message?: string;
  //   question?: Question;
  // }

  const retrieveQuestionsById= async (questionIds:string[]) => {
    console.log("now entering the test");
    console.log(questionIDs[0]);
    console.log(await getQuestion(jwt,questionIDs[0]));
    let questionTest = JSON.parse(await getQuestion(jwt,questionIDs[0]));

    let result = await Promise.all(questionIds.map(questionID => {getQuestion(jwt,questionID)}));//returns :Question[]
    console.log(result);
    return result;
  }

  //on page load, get all the question ids, then use them to get all the questions so you can display the question titles, and a clickable button to show more info+responses.
  const retrieveQuestions = async () => {
    getQuestionIDs(jwt).then((responseInfo) => {
      if (responseInfo.questionIDs){
        setQuestions([]);//clear the array before pushing the questions
        retrieveQuestionsById(responseInfo.questionIDs)
        // .then(questions:Question[] => {
        //   setQuestions(questions);
        // })
        
        // responseInfo.questionIDs.foreach(questionID => {
        //   questions.push(getQuestion(jwt,questionID));
        // })
      }
      
      if (responseInfo.success && responseInfo.questionIDs !== undefined) {
        setQuestionIDs(responseInfo.questionIDs);
      }
    });
  };

  return (
    <div className="blog-container">
      <Button onClick={showModal}>Create Question</Button>
      <hr></hr>
      <Button onClick={tempAddBlogPost}>Dummy Add</Button>
      <Button onClick={retrieveQuestions}>Trigger Get</Button>
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

