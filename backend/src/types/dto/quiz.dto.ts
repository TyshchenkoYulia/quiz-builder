import { QuestionType } from "@prisma/client";

export interface CreateQuestionDto {
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
