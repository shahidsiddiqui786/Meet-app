import React, { useState } from 'react';

import EmojiGrid from './EmojiGrid/EmojiGrid';
import ReactTooltip from "react-tooltip";

import './Input.css';



const Input = ({ setMessage, sendMessage, message, cameraMode, setCameraMode }) => {

    const [display, setDisplay ] = useState(false)

    const setEmojiContainer = (event) => {
    event.preventDefault();

    if(display) {
      setDisplay(false)
    }
    else {
      setDisplay(true)
    }
  }

  const resetCameraMode = () => {
 
    if(cameraMode) {
      setCameraMode(false)
    }
    else {
      setCameraMode(true)
    }
  }

  const sendMessageAndCloseEmojiContainer = ( e ) => {
      sendMessage(e)

      setEmojiContainer(e)
  }

  const addEmojiToInput = (event) => {
    setMessage( message + event.target.innerText)
  }
    
  return (
        display 
        ? ( 
          <div>
            <form id="emoji-container">
              <EmojiGrid addEmojiToInput={addEmojiToInput}></EmojiGrid>
              <ReactTooltip id="emoji" place="right" effect="solid">
                   Emojis 
              </ReactTooltip>
              <ReactTooltip id="photo" place="top" effect="solid">
                   Take Photo
              </ReactTooltip>
              <ReactTooltip id="sent" place="top" effect="solid">
                   send message
              </ReactTooltip>
            </form>
            <form id="send-container">
              <button  id="emoji-button" data-tip data-for="emoji" role="img" onClick={e => setEmojiContainer(e)}><span role="img" aria-label="emoji">😀</span></button>
              <input 
                  type="any"
                  className="message-input"
                  placeholder="Type a message..."
                  value={message}
                  onChange={({ target: { value } }) => setMessage(value)}
                  onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
              />
              <button 
                className="look-button" 
                data-tip data-for="photo"  
                role="img" 
                onClick={e => UploadMode(e)}
              >
                <img src={darkTheme ? imgWIcon : imgBIcon} alt="photoupload" />
              </button>

              <button 
                className="look-button" 
                data-tip data-for="photo"  
                role="img" 
                onClick={e => CameraMode(e)}
              >
                <img src={darkTheme ? camWhiteIcon : camBlackIcon} alt="camera" />
              </button>
            </form>
          </div>
         )
        : ( 
           <form id="send-form">
              <div id="send-container">
                  <button  className="look-button" role="img" onClick={e => setEmojiContainer(e)}><span role="img" aria-label="emoji">😀</span></button>
                  <input 
                      type="text"
                      className="message-input"
                      placeholder="Type a message..."
                      value={message}
                      onChange={({ target: { value } }) => setMessage(value)}
                      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                  />
                  <button className="look-button" data-tip data-for="photo"  role="img" onClick={() => resetCameraMode()}><span role="img" aria-label="emoji">🎬</span></button>
              </div>
              <button type="submit" id="send-button" data-tip data-for="sent" role="img" onClick={e => sendMessage(e)}><span role="img" aria-label="emoji">🚀</span></button>
            </form>
         )
)

}
export default Input;