import React, { useState } from 'react'
import { useTheme } from '../Provider/ThemeContext'

const ImageUpload = ({ 
    sendPhoto,  
    setImage, 
    handleUpload, 
    setMediaMode }) => {
     
    const [uploading, setUploading] = useState(false)
    const [uploaded ,setUploaded] = useState(false)
	
    const onFileChange = (e) => {
        setImage(e.target.files[0])
    }

    const onFileUpload = async() => {
          setUploading(true)
          await handleUpload()
          setUploading(false)
          setUploaded(true)
          console.log("uploaded")
    }

    const onCancel = () => {
        setMediaMode(false)
    }
	
    const onSent = () => {
        if(!uploaded) return
        sendPhoto()
        onCancel()
    }

    const darkTheme = useTheme()
    const outerStyle = {
        backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
        color: darkTheme ? '#00D4D4' : '#222'
    }

	return (
		<div style={outerStyle} className="image-screen">
            {uploading && <h1>Uploading...,Please Wait!</h1>}
            {uploaded && <h1>Uploaded ,Please enter send to send photo</h1>}
           <input 
               type="file" 
               onChange = {(e) => {onFileChange(e)}} 
            />
            
           <div className="btn-grid">
            <button 
              onClick={onFileUpload}
              className="send-picture-btn"
            >
              Upload!
            </button>
            
            <button 
                onClick={onSent}
                disabled={uploading}
                className="send-picture-btn" 
            >
                Send
            </button>
            <button
               className="cancel-btn" 
               onClick={onCancel}
            >
                cancel
            </button>
           </div>
        </div>
	)
}

export default ImageUpload