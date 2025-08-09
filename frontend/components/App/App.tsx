import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage/Home";
import CreateQuizPage from "../../pages/CreateQuizPage/CreateQuizPage";
import InfoQuizPage from "../../pages/InfoQuizPage/InfoQuizPage";
import Nav from "../Nav/Nav";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/quizzes/:id" element={<InfoQuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
