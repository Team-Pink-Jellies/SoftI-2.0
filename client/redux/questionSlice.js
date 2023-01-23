import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [
    "Tell me about yourself?",
    "What made you decide to get into tech?",
    "Have you ever had a project that had to change drastically while it was in progress? Tell me about it?",
    "Tell me about a major setback you’ve had, and how you handled it?",
    "Talk about a time where you had to make an important decision quickly?",
    "Have you ever had a deadline you were not able to meet, and how did you handle it?",
    "Talk about a time when you had to adapt to significant changes at work?",
    "Have you ever had to convince your team to do a job they were reluctant to do?",
    "Dicuss any positive contributions you've made to your previous organization, be as specific as possible with real world examples.",
  ],
  questionSet: [],
  isLoggedIn: false,
  isSessionStarted: false,
  user: {},
  currentQuestion: 0
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    display: (state, action) => {
      console.log(action);
      // console.log(state.value);
    },
    userLogin: (state, action) => {
      state.isLoggedIn = true;
    },
    startSession: (state, action) => {
      state.isSessionStarted = true;
      state.questionSet = pickQuestion(state.questions);
    },
    nextQuestion: (state, action) => {
      state.currentQuestion++;
    },
    endSession: (state, action) => {
      state.questionSet = [];
      state.currentQuestion = 0;
      state.isSessionStarted = false;
    }
  },
});


function pickQuestion(allQuestions) {
  let set = [];
  if (allQuestions.length < 3) return "not enough questions stored";
  for (let i = 0; i <= 2; i++) {
    const random = Math.floor(Math.random() * allQuestions.length);
    set.push(allQuestions[random]);
    allQuestions.splice(random, 1);
  }
  return set;
}

export const { display, userLogin, startSession, nextQuestion, endSession } = questionSlice.actions;

export default questionSlice.reducer;
