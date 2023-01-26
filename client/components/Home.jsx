import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionBox from './QuestionBox';
import { startSession } from '../reducers/questionSlice';
import MySessions from './MySessions';
import '../styles.css';

export default function Home() {
  // Initialize dispatch with useDispatch() hook provided by @redux/toolkit
  const dispatch = useDispatch();
  // Access the value of `isSessionStarted` within store, and place within `sessionStatus`
  const sessionStatus = useSelector((state) => state.question.isSessionStarted);

  return (
    <div id='home'>
      {/* Render the `QuestionBox` if a session has already started or render the `Start` button to begin a session on the basis of `sessionStatus` value  */}
      {sessionStatus ? (
        <QuestionBox />
      ) : (
        <>
          <button
            className='start-btn'
            onClick={() => dispatch(startSession())}
          >
            Start
          </button>
          <MySessions />
        </>
      )}
    </div>
  );
}
