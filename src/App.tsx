import { Route, Routes } from "react-router-dom";
import AboutPage from "./about/AboutPage";
import "./App.css";
import BlogPage from "./blog/BlogPage";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";
import {
  ABOUT_PAGE,
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
      name: "home",
      path: HOME_PAGE,
      component: <HomePage />,
      isProtected: false,
    },
    {
      name: "login",
      path: LOGIN_PAGE,
      component: <LoginPage />,
      isProtected: false,
    },
    {
      name: "about",
      path: ABOUT_PAGE,
      component: <AboutPage />,
      isProtected: true,
    },
    {
      name: "blog",
      path: BLOG_PAGE,
      component: <BlogPage />,
      isProtected: true,
    },
    {
      name: "questions",
      path: QUESTIONS_PAGE,
      component: <QuestionsPage />,
      isProtected: true,
    },
  ];

  return (
    <div className="App">
      <Routes>
        {pages.map(({ name, path, isProtected, component }) => {
          const routeElement = isProtected ? <>{component}</> : component;

          return <Route key={name} element={routeElement} path={path} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
