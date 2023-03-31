import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { ABOUT_PAGE, ACCOUNT_PAGE, BLOG_PAGE, LOGIN_PAGE, QUESTIONS_PAGE } from "../paths";

export default function HomePage() {
  const navigate = useNavigate();
  const { username, role, logout } = useLoginContext();

  return (
    <>
      <h1>Mentor Mountain</h1>
      {username && (
        <>
          <p>Welcome, {username} ({role})</p>
          <div>
            <Button onClick={() => navigate(BLOG_PAGE)}>Blog</Button>
            <Button onClick={() => navigate(QUESTIONS_PAGE)}>Questions</Button>
            <Button onClick={() => navigate(ABOUT_PAGE)}>About</Button>
            <Button onClick={() => navigate(ACCOUNT_PAGE)}>Account</Button>
          </div>
        </>
      )}

      {!username && (
        <Button onClick={() => navigate(LOGIN_PAGE)}>Login</Button>
      )}
      {username && <Button onClick={() => logout(() => 0)}>Logout</Button>}
    </>
  );
}
