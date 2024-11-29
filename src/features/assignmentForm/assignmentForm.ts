import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../../types";

type QuestionPayload = {
  name: "problem" | "answer" | "choices";
  value: string;
  id?: string;
  choiceId?: string;
};

const initialState: Assignment = {
  name: "",
  description: "",
  totalPoints: 0,
  classId: "",
  questions: [],
};

export const assignmentFormSlice = createSlice({
  name: "assignmentForm",
  initialState,
  reducers: {
    addQuestion: (state: Assignment) => {
      state.questions.push({
        problem: "",
        answer: "",
        choices: ["", "", "", ""],
        questionId: crypto.randomUUID(),
      });
    },
    removeQuestion: (state: Assignment, action) => {
      state.questions.filter(
        (question) => question.questionId !== action.payload
      );
    },
    editQuestion: (
      state: Assignment,
      action: PayloadAction<QuestionPayload>
    ) => {
      state.questions.map((question) => {
        if (question.questionId == action.payload.id) {
          if (action.payload.name === "choices") {
            question[action.payload.name].map((choice, index) =>
              index === Number(action.payload.choiceId)
                ? action.payload.value
                : choice
            );
          } else {
            question[action.payload.name] = action.payload.value;
          }
        }
      });
    },
    edit: <T extends keyof Assignment>(
      state: Assignment,
      action: PayloadAction<{ name: T; value: Assignment[T] }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setAssignment: (
      state: Assignment,
      action: PayloadAction<{ assignment: Assignment }>
    ) => {
      state = action.payload.assignment;
      return state;
    },
  },
});

export const { addQuestion, removeQuestion, editQuestion, edit } =
  assignmentFormSlice.actions;
export default assignmentFormSlice.reducer;
