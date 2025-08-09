import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateRequest(
  schema: ZodSchema,
  property: "body" | "query" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    next();
  };
}
