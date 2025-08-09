import { Request, Response, NextFunction } from "express";
import QuizService from "../services/quiz.service";
import { CreateQuizDto } from "../types/dto/quiz.dto";

class QuizController {
  private quizService = new QuizService();

  createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as CreateQuizDto;
      const quiz = await this.quizService.createQuiz(data);
      res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (error) {
      next(error);
    }
  };

  getAllQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.quizService.getAllQuizzes();

      if ("message" in result) {
        return res.status(404).json(result);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getQuizById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const quiz = await this.quizService.getQuizById(id);
      res.json(quiz);
    } catch (error) {
      next(error);
    }
  };

  deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.quizService.deleteQuiz(id);
      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default QuizController;
