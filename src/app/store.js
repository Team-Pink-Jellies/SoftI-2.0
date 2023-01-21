import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../features/question/questionSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});
