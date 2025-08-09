import { z } from "zod";
import { QuestionType } from "@prisma/client";

export const createQuestionSchema = z
  .object({
    text: z.string().min(1, "Питання не може бути порожнім"),
    type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
    options: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.type === "CHECKBOX") {
        return data.options && data.options.length > 0;
      }
      return true;
    },
    {
      message: "Для типу CHECKBOX потрібно вказати варіанти відповіді",
      path: ["options"],
    }
  );

export const createQuizSchema = z.object({
  title: z.string().min(1, "Назва квізу обов'язкова"),
  questions: z
    .array(createQuestionSchema)
    .min(1, "Потрібно принаймні одне питання"),
});
