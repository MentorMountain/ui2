import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../login/auth/LoginContextProvider";
import { LOGIN_PAGE } from "../paths";

export default function HomePage() {
  const navigate = useNavigate();
  const { username, role } = useLoginContext();

  return (
    <>
      <h1 className="mt-4 text-center">Welcome to Mentor Mountain</h1>
      {username && (
        <p className="text-center">
          Welcome, {username} ({role})
        </p>
      )}
      <Container>
        <Row xs={1} md={2} className="mt-4 justify-content-md-center">
          <Col md="6" lg="5" className="d-md-flex">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Ask a Question</Card.Title>
                <Card.Text>
                  Are you a student curious about anything related to school?
                  Ask a question and get responses from our group of mentors on
                  how to study or finish homework
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </Col>
          <Col md="6" lg="5" className="d-md-flex">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  View Mentor Blogs
                </Card.Title>
                <Card.Text>
                  Get the latest information and insights from our experienced
                  mentors. View our mentor's dedicated blog posts on how to
                  improve and succeed in school
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {!username && (
          <Row>
            <Container className="d-flex justify-content-around mt-4">
              <Button variant="dark" onClick={() => navigate(LOGIN_PAGE)}>
                Login
              </Button>
            </Container>
          </Row>
        )}
      </Container>
    </>
  );
}
