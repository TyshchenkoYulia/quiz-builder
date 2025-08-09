import { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz } from "../../services/quizApi";
import type { Quiz } from "../../services/quizApi";
import { Link } from "react-router-dom";
import css from "./Home.module.css";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadQuizzes() {
    try {
      setLoading(true);
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (erro) {
      console.error(erro);
      setError("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(id);
        setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      } catch (erro) {
        console.error(erro);
        alert("Failed to delete quiz");
      }
    }
  }

  useEffect(() => {
    loadQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;
  if (quizzes.length === 0) return <p>No quizzes found</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>All Quizzes</h1>
      <ol className={css.list}>
        {quizzes.map((quiz) => (
          <li className={css.item} key={quiz.id}>
            <Link to={`/quizzes/${quiz.id}`}>
              <h2>{quiz.title}</h2>
            </Link>
            <p>
              Questions: {quiz.questions?.length ?? quiz.questionCount ?? 0}
            </p>
            <button onClick={() => handleDelete(quiz.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
