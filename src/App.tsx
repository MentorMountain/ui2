import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./NotFoundPage";
import AboutPage from "./about/AboutPage";
import BlogPage from "./blog/BlogPage";
import FullPageSpinner from "./common/FullPageSpinner";
import HomePage from "./home/HomePage";
import AccountPage from "./login/AccountPage";
import LoginPage from "./login/LoginPage";
import { RequireLogin } from "./login/RequireLogin";
import { useLoginContext } from "./login/auth/LoginContextProvider";
import {
  ABOUT_PAGE,
  ACCOUNT_PAGE,
  BLOG_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  QUESTIONS_PAGE,
} from "./paths";
import QuestionsPage from "./questions/QuestionsPage";

interface Page {
  name: string;
  path: string;
  component: JSX.Element;
  isProtected: boolean;
}

function App() {
  const pages: Page[] = [
    {
      name: "Home",
      path: HOME_PAGE,
      component: <HomePage />,
      isProtected: false,
    },
    {
      name: "Login",
      path: LOGIN_PAGE,
      component: <LoginPage />,
      isProtected: false,
    },
    {
      name: "Account",
      path: ACCOUNT_PAGE,
      component: <AccountPage />,
      isProtected: true,
    },
    {
      name: "About",
      path: ABOUT_PAGE,
      component: <AboutPage />,
      isProtected: true,
    },
    {
      name: "Blog",
      path: BLOG_PAGE,
      component: <BlogPage />,
      isProtected: true,
    },
    {
      name: "Questions",
      path: QUESTIONS_PAGE,
      component: <QuestionsPage />,
      isProtected: true,
    },
    {
      name: "Not Found",
      path: "*",
      component: <NotFoundPage />,
      isProtected: false,
    },
  ];

  const { isInitialized } = useLoginContext();

  return (
    <div className="App mt-3">
      <Container>
        {isInitialized ? (
          <Routes>
            {pages.map(({ name, path, isProtected, component }) => {
              const routeElement = isProtected ? (
                <RequireLogin>{component}</RequireLogin>
              ) : (
                component
              );

              return <Route key={name} element={routeElement} path={path} />;
            })}
          </Routes>
        ) : (
          <FullPageSpinner />
        )}
      </Container>
    </div>
  );
}

export default App;
