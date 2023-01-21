import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { display } from "./questionSlice";

export function Question() {
  //   console.log("state:" + state);
  //   console.log("state.question: " + state.question);
  const question = useSelector((state) => state.question.value);
  const dispatch = useDispatch();
  //   function handleClick() {
  //     dispatch(display("jamesBOND"));
  //   }

  return (
    <div>
      <button onClick={() => dispatch(display("jamesBOND"))}>
        REDUXXXXXXXXXX
      </button>
    </div>
  );
}
