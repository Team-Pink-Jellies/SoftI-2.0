import React, { Component, useRef, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { nextQuestion, endSession } from '../redux/questionSlice';
import Question from './Question';
import Webcam from "react-webcam";




export default function QuestionBox() {
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.question.currentQuestion);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // useEffect(() => {
  //   handleStartCaptureClick()
  // }, [])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);


  const videoConstraints = {
    width: 1200,
    height: 800,
    facingMode: "user",
  };

  // const handleDownload = () => {
  //   handleStopCaptureClick()
  //   handleDownload()
  // }

  return (
    <div>
      <Webcam
        height={800}
        width={1200}
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        onUserMedia={handleStartCaptureClick}
      />
      {/* {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )} */}

      <Question />

      {currentQuestion === 2 ? <>
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
        <button onClick={handleDownload}>Download</button>
        <button className="end-btn" onClick={() => dispatch(endSession())}> End Session</button>
      </> : <button className=" next-btn" onClick={() => dispatch(nextQuestion())}>Next Question</button>}
    </div >
  );

}

