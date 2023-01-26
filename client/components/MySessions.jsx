import React, { useState, useEffect } from 'react';

function PreviousSession() {
  const [vidFiles, setVidFiles] = useState([]);
  const [view, setView] = useState(0);

  useEffect(async () => {
    //Fetch videos returned as array of objects
    const videoList = await fetch('http://localhost:3000/video');
    const parsedVideos = await videoList.json();

    try {
      const videoLinks = [];
      parsedVideos.forEach((vid, idx) => {
        videoLinks.push(
          `https://softi-nyoi2.s3.amazonaws.com/record_${idx + 1}.webm`,
        );
      });
      setFiles(videoLinks);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const records = [];
  //need to clean this up
  for (let i = 0; i <= vidFiles.length; i++) {
    if (i === 0) {
      records.push(<option value={null}>Select a session</option>);
    } else {
      records.push(<option value={i - 1}>{'Session ' + i}</option>);
    }
  }

  const handleChange = (idx) => {
    setView(vidFiles[idx]);
    console.log(view);
  };

  return (
    <>
      <video src={view} width='700' height='700' controls></video>
      <select onChange={(e) => handleChange(e.target.value)}>{records}</select>
      <p>test</p>
    </>
  );
}

export default PreviousSession;
