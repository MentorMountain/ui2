import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
