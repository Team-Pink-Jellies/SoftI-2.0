import React, { useState, useEffect } from 'react';

function PreviousSession() {
  const [files, setFiles] = useState([]);
  const [view, setView] = useState(0);

  useEffect(() => {
    // declare the async data fetching function
    const fetchVideoLength = async () => {
      // get the data from the api
      const videoList = await fetch('http://localhost:3000/video');
      // convert the data to json
      const parsedVids = await videoList.json();
      const videoArray = [];
      parsedVids.forEach((vid, idx) => {
        videoArray.push(
          `https://softi-nyoi2.s3.amazonaws.com/record_${idx + 1}.webm`,
        );
      });
      setFiles(videoArray);
    };
    fetchVideoLength().catch(console.error);
  }, []);

  const records = [];

  for (let i = 0; i <= files.length; i++) {
    if (i === 0) {
      records.push(<option value={null}>Select a session</option>);
    } else {
      records.push(<option value={i - 1}>{'Session ' + i}</option>);
    }
  }

  const handleChange = (idx) => {
    setView(files[idx]);
    console.log(view);
  };

  return (
    <>
      <video src={view} width='600' height='600' controls></video>
      <select onChange={(e) => handleChange(e.target.value)}>{records}</select>
    </>
  );
}

export default PreviousSession;
