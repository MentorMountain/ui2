import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE } from "./paths";

export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="mt-3 d-flex justify-content-around">
          <div
            className="d-flex mt-4 flex-column"
            style={{ textAlign: "center" }}
          >
            <h1>Page not found</h1>
            <p>We can't find {location.pathname}</p>

            <div>
              <Button variant="dark" onClick={() => navigate(HOME_PAGE)}>Go home</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
