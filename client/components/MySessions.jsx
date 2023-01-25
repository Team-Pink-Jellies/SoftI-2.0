import React, { useState, useEffect } from 'react';

function PreviousSession() {
  const [files, setFiles] = useState([]);
  const [view, setView] = useState(0);

  let records = [];

  useEffect(() => {
    fetch('http://localhost:3000/video')
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        let files = [];
        res.forEach((f, idx) => {
          files.push(
            `https://softi-nyoi2.s3.amazonaws.com/record_${idx + 1}.webm`
          );
        });
        setFiles(files);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <video src={view} width='700' height='700' controls></video>
      <select onChange={(e) => handleChange(e.target.value)}>{records}</select>
      <p>test</p>
    </>
  );
}

export default PreviousSession;
