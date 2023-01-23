import React, { Component } from 'react';
import { useSelector, useDispatch } from "react-redux";
import QuestionBox from './QuestionBox';
import { startSession } from '../redux/questionSlice';
import '../styles.css';

export default function Home() {
  const dispatch = useDispatch();
  const sessionStatus = useSelector((state) => state.question.isSessionStarted);

  return (
    <div id="home">

      {/* <button onClick={() =>  }>Start</button> */}
      {sessionStatus ? <QuestionBox /> : <>
        <h2>Press "Start" to begin interview session.</h2>
        <button className="start-btn" onClick={() => dispatch(startSession())}>Start</button>
      </>}


    </div>
  )
}

