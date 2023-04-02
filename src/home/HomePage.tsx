import { Card, Row, Col, Container } from "react-bootstrap";
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
      <h1 className="pt-4 text-center">Welcome to Mentor Mountain</h1>
      {username && (
        <>
          <p className="text-center">
            Welcome, {username} ({role})
          </p>
        </>
      )}
      <Container>
        <Row xs={1} md={2} className="pt-5 justify-content-md-center">
          <Col md="6" lg="5" className="d-md-flex">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Ask a Question</Card.Title>
                <Card.Text>
                  Are you a student curious about anything related to school? Ask a question and get responses from 
                  our group of mentors on how to study or finish homework
                </Card.Text>
              </Card.Body>
            </Card>
            <br/>
          </Col>
          <Col md="6" lg="5" className="d-md-flex">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">View Mentor Blogs</Card.Title>
                <Card.Text>
                  Get the latest information and insights from our experienced mentors. View our mentor's dedicated blog posts on how
                  to improve and succeed in school
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
