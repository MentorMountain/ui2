import { Image, ListGroup, Spinner } from "react-bootstrap";
import profilePicture from "../common/img/placeholderProfilePicture.png";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { Question } from "./Questions.model";

interface QuestionListProps {
  shouldShowSpinner: boolean;
  questionList: Question[];
  showQuestion: (question: Question) => void;
}

export default function QuestionList({
  shouldShowSpinner,
  questionList,
  showQuestion,
}: QuestionListProps) {
  const { role, username } = useLoginContext();
  return (
    <div className="mt-3">
      <hr className={shouldShowSpinner ? "" : "visually-hidden"} />
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
      <hr
        className={
          questionList.length < 1 && !shouldShowSpinner ? "" : "visually-hidden"
        }
      ></hr>
      <div
        className={
          questionList.length < 1 && !shouldShowSpinner && role === "student"
            ? "empty-list-text"
            : "visually-hidden"
        }
      >
        <p>
          Hello {username}! Any questions you create will show up down here!
        </p>
        Get started helping students by hitting the button above to contribute
        some experiences! 👍
      </div>
      <div
        className={
          questionList.length < 1 && !shouldShowSpinner && role === "mentor"
            ? "empty-list-text"
            : "visually-hidden"
        }
      >
        <p>Hey Mentors! Seems like there's no questions at the moment.</p>
        Check again a bit later after our students have had a chance to ask some
        questions! 🙂
      </div>

      {questionList.length > 0 && (
        <ListGroup>
          {questionList.map((question) => {
            const { authorID, date, title, id } = question;
            return (
              <ListGroup.Item
                key={id!}
                action
                onClick={() => showQuestion(question)}
              >
                <div className="d-flex justify-content-start p-2">
                  <div
                    className="text-center"
                    style={{ marginRight: "2em", width: "4em" }}
                  >
                    <Image
                      src={profilePicture}
                      roundedCircle={true}
                      width="45px"
                      height="45px"
                    />
                    <p className="author-name mb-0">{authorID}</p>
                  </div>
                  <div style={{width: "93%"}}>
                    <h3 className="break-long-text">{title}</h3>
                    <p className="post-info mb-0">
                      {new Date(date).toLocaleDateString("en-CA")}{" "}
                      <span className="bullet-point">-</span>&nbsp;
                      {new Date(date).toLocaleTimeString("en-CA")}{" "}
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}
