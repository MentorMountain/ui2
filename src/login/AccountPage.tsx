import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useLoginContext } from "./auth/LoginContextProvider";
import { becomeMentorEndpoint } from "./auth/LoginService";

export default function AccountPage() {
  const [mentorPassword, setMentorPassword] = useState<string>("");
  const [wasIncorrectPasswordProvided, setWasIncorrectPasswordProvided] =
    useState<boolean>(false);

  const { role, refreshLogin, jwt } = useLoginContext();

  const attemptAccountUpgrade = async (password: string) => {
    if (mentorPassword.length > 0) {
      const response = await becomeMentorEndpoint(jwt, password);
      if (response.success) {
        return refreshLogin(response.token!, () =>
          console.log("Upgraded to mentor account")
        );
      }
      return false;
    }
  };

  const onUpgradeClicked = async (e: React.MouseEvent, password: string) => {
    e.preventDefault();
    console.log("Submitting", password);
    const success = await attemptAccountUpgrade(password);

    if (success) {
      setMentorPassword("");
    }
    setWasIncorrectPasswordProvided(!success);
  };

  return (
    <>
      <h1>Account</h1>
      <div className="d-flex mt-4 justify-content-center">
        <Card style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title>Become a Mentor</Card.Title>
            {role === "student" ? (
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="mentorUpgrade.password">
                  <Form.Control
                    placeholder="Mentor Password"
                    type="password"
                    value={mentorPassword}
                    onChange={(e) => setMentorPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    disabled={mentorPassword.length === 0}
                    onClick={(e) => onUpgradeClicked(e, mentorPassword)}
                  >
                    Submit
                  </Button>
                </Form.Group>
                {wasIncorrectPasswordProvided ? (
                  <div className="mt-4">
                    {" "}
                    <Form.Text className="mt-1">
                      Invalid password provided
                    </Form.Text>
                  </div>
                ) : (
                  <></>
                )}
              </Form>
            ) : (
              <Card.Text>You are already a mentor</Card.Text>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
