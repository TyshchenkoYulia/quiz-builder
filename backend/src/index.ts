import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quizzes", quizRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: err.message || "Internal server error" });
  }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
