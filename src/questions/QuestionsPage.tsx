import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Question } from "./Questions.model";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import QuestionCreator, { BlogPostInformationProps } from "./QuestionCreator";
import QuestionList from "./QuestionList";
import "./blog.css";
import {
  GetQuestion,
  getQuestion,
  getQuestionIDs,
  postQuestion,
} from "./service/QuestionsService";
import QuestionView from "./QuestionView";

export default function QuestionsPage() {
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [questionIDs, setQuestionIDs] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const showQuestionCreatorModal = () => setShowPostCreator(true);
  const hideQuestionCreatorModal = () => setShowPostCreator(false);

  const { jwt, role } = useLoginContext();

  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(
    undefined
  );

  const submitQuestion = ({ title, content }: BlogPostInformationProps) => {
    // TODO-JAROD: create an HTML call with onSuccess and onError and execute it
    console.info(
      `BUTTON PRESSED WITH THE FOLLOWING DATA: title=${title}, content=${content}`
    );
    postQuestion(jwt, title, content).then((_) =>
      console.log("done posting question!")
    );
    getQuestionIDs(jwt).then((_) => console.log("done get of IDs!"));
    retrieveQuestions().then((_) => console.log("done get of questions!"));
    hideQuestionCreatorModal();
  };

  const retrieveQuestionsById = useCallback(
    async (questionIds: string[]) => {
      console.log("now entering the test");
      console.log(questionIDs[0]);
      console.log(await getQuestion(jwt, questionIDs[0]));
      let promises: Promise<GetQuestion>[] = [];
      questionIds.forEach((questionID) => {
        promises.push(getQuestion(jwt, questionID));
      });
      let result: GetQuestion[] = await Promise.all(promises);
      console.log(result);
      let result2: Question[] = result.map((res) => res.question as Question);
      //if (typeof result2 !== undefined){
      setQuestions(result2);
      //}
      // else{
      //   setQuestions([]);
      // }
    },
    [jwt, questionIDs]
  );

  //on page load, get all the question ids, then use them to get all the questions so you can display the question titles, and a clickable button to show more info+responses.
  const retrieveQuestions = useCallback(async () => {
    getQuestionIDs(jwt).then((responseInfo) => {
      if (responseInfo.questionIDs) {
        setQuestions([]); //clear the array before pushing the questions
        const result = retrieveQuestionsById(responseInfo.questionIDs);

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
  }, [jwt, retrieveQuestionsById]);

  useEffect(() => {
    retrieveQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="blog-container">
      {role === "student" && (
        <>
          <Button onClick={showQuestionCreatorModal}>Create Question</Button>
        </>
      )}

      <QuestionCreator
        show={showPostCreator}
        onShow={showQuestionCreatorModal}
        onSubmit={submitQuestion}
        onHide={hideQuestionCreatorModal}
      />
      <QuestionList
        questionList={questions}
        showQuestion={setCurrentQuestion}
      />
      <QuestionView
        currentQuestion={currentQuestion}
        showQuestion={setCurrentQuestion}
      />
    </div>
  );
}
