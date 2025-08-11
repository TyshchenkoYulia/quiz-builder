// import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../../services/quizApi";
import css from "./CreateQuizPage.module.css";

type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

type FormData = {
  title: string;
  questions: {
    text: string;
    type: QuestionType;
    options?: string[];
  }[];
};

export default function CreateQuizPage() {
  const navigate = useNavigate();

  const { control, register, handleSubmit, watch, setValue } =
    useForm<FormData>({
      defaultValues: {
        title: "",
        questions: [
          {
            text: "",
            type: "CHECKBOX",
            options: ["", ""],
          },
        ],
      },
    });

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "questions",
  });

  // Функція для додавання опції у конкретне питання
  function addOption(questionIndex: number) {
    const options = watch(`questions.${questionIndex}.options`) || [];
    setValue(`questions.${questionIndex}.options`, [...options, ""]);
  }

  // Функція для зміни типу питання та автоматичного оновлення опцій
  function handleTypeChange(questionIndex: number, type: QuestionType) {
    setValue(`questions.${questionIndex}.type`, type);
    if (type === "BOOLEAN") {
      setValue(`questions.${questionIndex}.options`, ["True", "False"]);
    } else if (type === "INPUT") {
      setValue(`questions.${questionIndex}.options`, undefined);
    } else if (type === "CHECKBOX") {
      setValue(`questions.${questionIndex}.options`, ["", ""]);
    }
  }

  async function onSubmit(data: FormData) {
    try {
      await createQuiz(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  }

  return (
    <div className={css.container}>
      <h1>Create New Quiz</h1>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Quiz Title:
          <input {...register("title", { required: true })} />
        </label>

        {questions.map((question, qIndex) => {
          const type = watch(`questions.${qIndex}.type`);
          const options = watch(`questions.${qIndex}.options`) || [];

          return (
            <div key={question.id} className={css.question}>
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                {...register(`questions.${qIndex}.text`, { required: true })}
              />

              <select
                value={type}
                onChange={(e) =>
                  handleTypeChange(qIndex, e.target.value as QuestionType)
                }
              >
                <option value="BOOLEAN">Boolean</option>
                <option value="INPUT">Input</option>
                <option value="CHECKBOX">Checkbox</option>
              </select>

              {(type === "CHECKBOX" || type === "BOOLEAN") && (
                <div className={css.options}>
                  {options.map((_: string, oIndex: number) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      {...register(`questions.${qIndex}.options.${oIndex}`, {
                        required: true,
                      })}
                    />
                  ))}

                  {type === "CHECKBOX" && (
                    <button
                      type="button"
                      onClick={() => addOption(qIndex)}
                      className={css.addOptionBtn}
                    >
                      + Add Option
                    </button>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => remove(qIndex)}
                className={css.removeBtn}
              >
                Remove Question
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({ text: "", type: "CHECKBOX", options: ["", ""] })
          }
        >
          + Add Question
        </button>
        <button type="submit" className={css.submitBtn}>
          Save Quiz
        </button>
      </form>
    </div>
  );
}
