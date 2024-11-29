import { configureStore } from "@reduxjs/toolkit";
import assignmentFormSlice  from "../features/assignmentForm/assignmentForm";

export const store =  configureStore({
    reducer: {
        assignmentForm: assignmentFormSlice}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;