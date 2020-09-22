import React,{ useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";

import './CameraScreen.css'

 

  const CameraScreen = ({ sendPhoto,  setImage, submitData, handleUpload,  setCameraMode }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [sendMode, setSendMode] = useState(false);



  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({width: 392, height: 380});
    setImgSrc(imageSrc);
    setImage(imageSrc);
    setSendMode(true);
    console.log("photo taken")
    // eslint-disable-next-line 
  }, [webcamRef, setImgSrc]);

  const upload = async() => {
     await handleUpload()
     submitData()
     sendPhoto()
     setCameraMode(false)
  }

  return (
       sendMode
       ? (
            <div className="image-screen">
              <img
                className="screenshot"
                src={imgSrc} alt={imgSrc}
              />
              <div className="btn-grid">
                  <button className="cancel-btn" role="img" onClick={() => setCameraMode(false)}>cancel</button>
                  <button className="retake-btn" role="img" onClick={() => setSendMode(false)}>retake</button>
                  <button className="send-picture-btn" role="img" onClick={() => upload()}>sent</button>
              </div>    
        </div>
       )
       : (
        <div className="camera-screen">
            <Webcam
              className="webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button className="camera-btn" onClick={capture}>Capture photo</button>
         </div>
       )
  );
};

export default CameraScreen
 