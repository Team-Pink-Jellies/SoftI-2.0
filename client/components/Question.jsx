import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { display } from "../redux/questionSlice";

export default function Question() {
  //   console.log("state:" + state);
  //   console.log("state.question: " + state.question);
  const questionSet = useSelector((state) => state.question.questionSet);
  const currentQuestion = useSelector((state) => state.question.currentQuestion);
  const dispatch = useDispatch();


  return (
    <div id='question-box'>
      <p>{questionSet[currentQuestion]}</p>
      {/* <button onClick={() => dispatch(display("jamesBOND"))}> */}


    </div >
  );
}
