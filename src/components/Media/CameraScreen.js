import React,{ useState, useRef, useCallback } from 'react'
import Webcam from "react-webcam"
import { useTheme } from '../Provider/ThemeContext'
import './CameraScreen.css'

 

  const CameraScreen = ({ 
    sendPhoto,  
    setImage, 
    handleUpload, 
    setMediaMode,
    setCameraMode
  }) => {

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null)
  const [sendMode, setSendMode] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [frontMode, setFrontMode] = useState(true)
  const [face, setFace] = useState({ facingMode: "user" })


  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({width: 300, height: 300})
    setImgSrc(imageSrc)
    setImage(imageSrc)
    setSendMode(true)
    console.log("photo taken")
    // eslint-disable-next-line 
  }, [webcamRef, setImgSrc])
  
  const setselfmode = () => {
    setFace({ facingMode: "user" })
  }
  const setbackmode = () => {
    setFace({facingMode: { exact: "environment" }})
  }
  const toggleMode = () => {
    setFrontMode(!frontMode)
    if(frontMode) setselfmode()
    else setbackmode()
  }
  const upload = async() => {
     setUploading(true)
     await handleUpload()
     setUploading(false)
     setUploaded(true)
  }
  const HomeScreen = () => {
    setMediaMode(false)
    setCameraMode(false)
  }
  const sent = () => {
    if(!uploaded) return ;
    sendPhoto()
    HomeScreen()
  }

  const darkTheme = useTheme()

  const outerStyle = {
    backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
    color: darkTheme ? '#00D4D4' : '#222'
  }

  return (
    sendMode
    ? (
        <div style={outerStyle} className="image-screen">
          {uploading && <h1 className="uploading">Uploading...,Please Wait!</h1>}
          {uploaded && <h3 className="uploaded">Uploaded ,Please enter send to send photo</h3>}
          <img
            className="screenshot"
            src={imgSrc} alt={imgSrc}
          />
          <div className="btn-grid">
            <button 
              className="cancel-btn" 
              role="img" onClick={() => HomeScreen()}
            >
              cancel
            </button>

            <button 
              className="retake-btn" 
              role="img" 
              onClick={() => setSendMode(false)}
            >
              retake
            </button>

            <button 
              className="send-picture-btn" 
              role="img" onClick={() => upload()}
            >
              upload
            </button>

            <button
              disabled={uploading} 
              className="send-picture-btn" 
              role="img" onClick={() => sent()}
            >
              send
            </button>
          </div>    
    </div>
    )
    : (
      <div style={outerStyle} className="camera-screen">
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          videoConstraints = {face}
          screenshotFormat="image/jpeg"
        />
        <div className="camera_grid">
          <button 
            className="camera-btn" 
            onClick={capture}
          >
            Capture photo
          </button>
          <button 
            className="retake-btn" 
            onClick={toggleMode}
          >
            toggle
          </button>
        </div>
      </div>
    )
  )
}

export default CameraScreen