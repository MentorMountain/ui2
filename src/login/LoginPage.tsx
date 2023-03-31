import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Form,
  Spinner,
  Toast,
} from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { HOME_PAGE } from "../paths";
import { useLoginContext } from "./auth/LoginContextProvider";

export default function LoginPage() {
  const { login, signup, username } = useLoginContext();
  const reactLocation = useLocation();

  const from = reactLocation.state?.from?.pathname || HOME_PAGE;
  const [processingLogin, setProcessingLogin] = useState(false);
  const [formUsername, setFormUsername] = useState<string>("");
  const [formPassword, setFormPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [systemMessage, setSystemMessage] = useState<string>("");

  const onUsernameChanged = (text: string) => {
    setFormUsername(text);
    setIsValid(text.length > 0 && formPassword.length > 0);
  };

  const onPasswordChanged = (text: string) => {
    setFormPassword(text);
    setIsValid(formUsername.length > 0 && text.length > 0);
  };

  const onSubmit = async () => {
    setProcessingLogin(true);

    if (isLogin) {
      const loginSuccess = await login(formUsername, formPassword, () => {});
      setSystemMessage("Failed to login");
      console.log(loginSuccess);
    } else {
      const signupSuccess = await signup(formUsername, formPassword);
      if (!signupSuccess) {
        setSystemMessage("Failed to create user");
      }
      console.log(signupSuccess);
    }

    setProcessingLogin(false);
  };

  if (username) {
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <div className="d-flex mt-4 flex-column">
        <div className="mt-3 d-flex justify-content-around">
          <Card style={{ width: "20em" }}>
            <Card.Body>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onChange={(e) => onUsernameChanged(e.target.value)}
                    value={formUsername}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => onPasswordChanged(e.target.value)}
                    value={formPassword}
                    type="password"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <ButtonGroup className="d-flex justify-content-around">
                <Button
                  onClick={onSubmit}
                  disabled={!isValid || processingLogin}
                >
                  {processingLogin && (
                    <span>
                      <Spinner size="sm" />
                      {"   "}
                    </span>
                  )}
                  {isLogin ? "Login" : "Create an account"}
                </Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </div>
        <Button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-2"
          variant="link"
        >
          {isLogin ? "Create an account" : "I already have an account"}
        </Button>
        <div className="mt-4 d-flex justify-content-around">
          <Toast
            show={systemMessage.length > 0}
            onClose={() => setSystemMessage("")}
            delay={4000}
            autohide
          >
            <Toast.Header>Login</Toast.Header>
            <Toast.Body>{systemMessage}</Toast.Body>
          </Toast>
        </div>
      </div>
    </>
  );
}
