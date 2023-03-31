import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import {
  ABOUT_PAGE,
  ACCOUNT_PAGE,
  BLOG_PAGE,
  LOGIN_PAGE,
  QUESTIONS_PAGE,
} from "../paths";

export default function HomePage() {
  const navigate = useNavigate();
  const { username, role, logout } = useLoginContext();

  return (
    <>
      <h2>Welcome to Mentor Mountain</h2>
      {username && (
        <>
          <p>
            Welcome, {username} ({role})
          </p>
        </>
      )}
    </>
  );
}
