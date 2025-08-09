import React, { useEffect, useState } from "react";
import { getQuizzes, Quiz } from "../../services/quizApi";

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getQuizzes()
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load quizzes");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;
  if (quizzes.length === 0) return <p>No quizzes found</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {quizzes.map(({ id, title, questionCount }) => (
        <div
          key={id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            width: 220,
            cursor: "pointer",
          }}
          onClick={() => alert(`Open quiz id ${id}`)} // Пізніше заміниш на роутінг
        >
          <h3>{title}</h3>
          <p>Questions: {questionCount ?? 0}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
