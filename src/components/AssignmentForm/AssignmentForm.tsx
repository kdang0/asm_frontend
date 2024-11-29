// import { useState, useEffect } from "react";
import { QuestionForm } from "../QuestionForm/QuestionForm";
import styles from "./AssignmentForm.module.css";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Assignment, Class } from "../../types";

interface AssignmentFormProps {
  assignmentItem: Assignment;
  classes: Class[];
  createAssignment: (assignment: Assignment) => void;
  formType: string;
}
export default function AssignmentForm({
  assignmentItem,
  classes,
  createAssignment,
  formType,
}: AssignmentFormProps) {
  const methods = useForm<Assignment>({
    defaultValues: assignmentItem,
  });
  const { register, handleSubmit, control } = methods;

  //control allows for react hook form to be able to synchronize targeted form fields with the useform state; in our case we want to target the questions property belonging to our Assignment object
  //This allows us to dynamically do things like add and remove fields within the array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  //SENDS BACK UPDATED ASSIGNMENT STATE TO PARENT COMPONENT ON SUBMISSION
  const onSubmit = (data: Assignment) => {
    const updatedQuestions = data.questions.map((question) => {
      return {
        ...question,
        choices: question.choices.map((choice) =>
          typeof choice === "string" ? choice : choice.value
        ),
      };
    });
    const updatedAssignment = { ...data, questions: updatedQuestions };
    createAssignment(updatedAssignment);
  };

  return (
    <FormProvider {...methods}>
      <button
        type="button"
        onClick={() =>
          append({
            problem: "",
            answer: "",
            choices: [
              { value: "" },
              { value: "" },
              { value: "" },
              { value: "" },
            ],
          })
        }
      >
        Append
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`displayFlex flexColumn`}
      >
        <div>
          <label>Name:</label>
          <input type="text" {...register("name")} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" {...register("description")} />
        </div>
        <div>
          <label>Total Points:</label>
          <input type="number" {...register("totalPoints")} />
        </div>
        <div>
          <label>Select Class:</label>
          <select {...register("classId")}>
            {classes.map((classInst) => (
              <option key={classInst._id} value={classInst._id}>
                {classInst.name}
              </option>
            ))}
          </select>
        </div>

        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <QuestionForm index={index} />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </div>
          );
        })}

        <div className={`${styles.container}`}>
          <button type="submit">
            {formType === "edit" ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
