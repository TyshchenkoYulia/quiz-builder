const BASE_URL = "http://localhost:4000/quizzes";

export interface Question {
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: string[];
}

export interface Quiz {
  id: number;
  title: string;
  questionCount?: number;
  questions: Question[];
}

export async function getQuizzes(): Promise<Quiz[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  return res.json();
}

export async function getQuizById(id: number): Promise<Quiz> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch quiz details");
  }
  return res.json();
}

export async function createQuiz(data: {
  title: string;
  questions: Question[];
}): Promise<Quiz> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create quiz");
  }
  return res.json();
}

export async function deleteQuiz(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete quiz");
  }
}
