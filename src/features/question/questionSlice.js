import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "What is your name?",
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    display: (state, action) => {
      console.log(action);
      console.log(state.value);
    },
  },
});

export const { display } = questionSlice.actions;

export default questionSlice.reducer;
