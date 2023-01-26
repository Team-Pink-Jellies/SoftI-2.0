import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';

function PreviousSession() {
  const [videoList, setVideoList] = useState([]);
  const [view, setView] = useState(0);

  useEffect(() => {
    //Retrieving list of videos links
    const fetchVideoLength = async () => {
      const videoLinks = await fetch('http://localhost:3000/video');
      const parsedVids = await videoLinks.json();
      const videoArray = [];
      // iterating through parsed array in order to store unique video link at proper index
      parsedVids.forEach((vid, idx) => {
        videoArray.push(
          `https://softi-nyoi2.s3.amazonaws.com/record_${idx + 1}.webm`,
        );
      });
      setVideoList(videoArray);
    };
    fetchVideoLength().catch(console.error);
  }, []);

  const vidSessions = [];

  for (let i = 0; i <= videoList.length; i++) {
    if (i === 0) {
      vidSessions.push(<option value={null}>Select a session</option>);
    } else {
      vidSessions.push(<option value={i - 1}>{'Session ' + i}</option>);
    }
  }

  const handleChange = (idx) => {
    setView(videoList[idx]);
    console.log(view);
  };

  return (
    <>
      <video src={view} width='550' height='550' controls></video>
      <select onChange={(e) => handleChange(e.target.value)}>
        {vidSessions}
      </select>
      <Drawer></Drawer>
    </>
  );
}

export default PreviousSession;
