import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, type Quiz } from "../../services/quizApi";
import css from "./InfoQuizPage.module.css";

export default function InfoQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const quizId = Number(id);
    if (isNaN(quizId)) {
      alert("Invalid quiz id");
      navigate("/");
      return;
    }
    (async () => {
      try {
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load quiz");
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (loading) return <p className={css.loading}>Loading...</p>;
  if (!quiz) return <p className={css.error}>Quiz not found</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{quiz.title}</h1>

      <div className={css.questions}>
        {quiz.questions.map((q, index) => (
          <div key={index} className={css.questionCard}>
            <h3 className={css.questionText}>
              {index + 1}. {q.text}
            </h3>
            <span className={css.typeTag}>{q.type}</span>
            {Array.isArray(q.options) && (
              <ul className={css.options}>
                {q.options.map((opt, i) => (
                  <li key={i} className={css.option}>
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
