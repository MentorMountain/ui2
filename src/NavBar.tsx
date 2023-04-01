import { Container, Nav, Navbar } from "react-bootstrap";
import { ACCOUNT_PAGE, HOME_PAGE } from "./paths";
import { useLoginContext } from "./login/auth/LoginContextProvider";
import { useNavigate } from "react-router-dom";
import { ABOUT_PAGE } from "./paths";
import { LOGIN_PAGE } from "./paths";
import { QUESTIONS_PAGE } from "./paths";
import { BLOG_PAGE } from "./paths";

export default function NavBar() {
  const navigate = useNavigate();
  const { username, logout } = useLoginContext();

  const isLoggedIn = username !== "";

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate(HOME_PAGE)}>
          Mentor Mountain
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link onClick={() => navigate(QUESTIONS_PAGE)}>
                  Questions
                </Nav.Link>
                <Nav.Link onClick={() => navigate(BLOG_PAGE)}>Blog</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn && (
              <>
                <Nav.Link onClick={() => navigate(ABOUT_PAGE)}>About</Nav.Link>
                <Nav.Link onClick={() => navigate(ACCOUNT_PAGE)}>
                  Account
                </Nav.Link>
              </>
            )}
            {isLoggedIn ? (
              <Nav.Link
                onClick={() => logout(() => console.log("Logging out"))}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate(LOGIN_PAGE)}>Login</Nav.Link>
            )}
            {isLoggedIn && <Navbar.Text>({username})</Navbar.Text>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
