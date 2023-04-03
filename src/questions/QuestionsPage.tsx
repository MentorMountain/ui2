import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import QuestionCreator, { QuestionInfoProps } from "./QuestionCreator";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import { Question } from "./Questions.model";
import "./blog.css";
import {
  GetQuestion,
  getQuestion,
  getQuestionIDs,
  postQuestion,
} from "./service/QuestionsService";

export default function QuestionsPage() {
  const DEFAULT_QUESTION = {
    id: "",
    authorID: "",
    date: 0,
    title: "",
    content: "",
  };
  const [showPostCreator, setShowPostCreator] = useState<boolean>(false);
  const [showQuestionView, setShowQuestionView] = useState<boolean>(false);
  const [questionIDs, setQuestionIDs] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGettingQuestions, setIsGettingQuestions] = useState<boolean>(true);
  const showQuestionCreatorModal = () => setShowPostCreator(true);
  const hideQuestionCreatorModal = () => setShowPostCreator(false);
  const showQuestionViewModal = () => setShowQuestionView(true);
  const hideQuestionViewModal = () => {
    setShowQuestionView(false);
    setCurrentQuestion(DEFAULT_QUESTION);
  };

  const { jwt, role } = useLoginContext();

  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(DEFAULT_QUESTION);

  const submitQuestion = ({ title, content }: QuestionInfoProps) => {
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
    setIsGettingQuestions(true);
    getQuestionIDs(jwt).then(async (responseInfo) => {
      if (responseInfo.questionIDs) {
        setQuestions([]); //clear the array before pushing the questions
        const result = await retrieveQuestionsById(responseInfo.questionIDs);

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
      setIsGettingQuestions(false);
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
        shouldShowSpinner={isGettingQuestions}
        questionList={questions}
        showQuestion={(question: Question) => {
          setCurrentQuestion(question);
          setShowQuestionView(true);
        }}
      />
      {currentQuestion.id !== "" && (
        <QuestionView
          show={showQuestionView}
          onHide={hideQuestionViewModal}
          onShow={showQuestionViewModal}
          currentQuestion={currentQuestion}
        />
      )}
    </div>
  );
}
