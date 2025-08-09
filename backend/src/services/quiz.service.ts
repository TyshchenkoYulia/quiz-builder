import prisma from "../prismaClient";
import { CreateQuizDto } from "../types/dto/quiz.dto";

class QuizService {
  async createQuiz(data: CreateQuizDto) {
    const questionsData = data.questions.map((q) => ({
      text: q.text,
      type: q.type,
      options: q.type === "CHECKBOX" ? JSON.stringify(q.options) : null,
    }));

    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: questionsData,
        },
      },
      include: { questions: true },
    });
    return quiz;
  }

  async getAllQuizzes() {
    const quizzes = await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        questions: { select: { id: true } },
      },
    });

    if (quizzes.length === 0) {
      return { message: "No quizzes found", quizzes: [] };
    }

    return quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      questionCount: q.questions.length,
    }));
  }

  async getQuizById(id: number) {
    const quiz = await prisma.quiz.findUnique({
      where: { id: id },
      include: { questions: true },
    });
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  }

  async deleteQuiz(id: number) {
    await prisma.question.deleteMany({
      where: { quizId: id },
    });

    await prisma.quiz.delete({
      where: { id },
    });
  }
}

export default QuizService;
