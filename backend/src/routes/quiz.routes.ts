import { Router } from "express";
import QuizController from "../controllers/quiz.controller";
import { validateRequest } from "../middleware/validateRequest";
import { createQuizSchema } from "../validators/quiz.validator";

const router = Router();
const quizController = new QuizController();

router.post("/", validateRequest(createQuizSchema), quizController.createQuiz);
router.get("/", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuizById);
router.delete("/:id", quizController.deleteQuiz);

export default router;
