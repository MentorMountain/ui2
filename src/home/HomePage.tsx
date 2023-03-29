import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { ABOUT_PAGE, BLOG_PAGE, LOGIN_PAGE, QUESTIONS_PAGE } from "../paths";

export default function HomePage() {
  const navigate = useNavigate();
  const { computingID, role, logout } = useLoginContext();

  return (
    <>
      <h1>Mentor Mountain</h1>
      {computingID && (
        <>
          <p>Welcome, {computingID} ({role})</p>
          <div>
            <Button onClick={() => navigate(ABOUT_PAGE)}>About</Button>
            <Button onClick={() => navigate(BLOG_PAGE)}>Blog</Button>
            <Button onClick={() => navigate(QUESTIONS_PAGE)}>Questions</Button>
          </div>
        </>
      )}

      {!computingID && (
        <Button onClick={() => navigate(LOGIN_PAGE)}>Login</Button>
      )}
      {computingID && <Button onClick={() => logout(() => 0)}>Logout</Button>}
    </>
  );
}
