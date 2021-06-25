import React, { useState } from 'react';

import EmojiGrid from './EmojiGrid/EmojiGrid'
import ReactTooltip from "react-tooltip"
import imgBIcon from '../../icons/image_black.svg'
import imgWIcon from '../../icons/image_white.svg'
import camBlackIcon from '../../icons/photo_camera_black_24dp.svg'
import camWhiteIcon  from '../../icons/photo_camera_white_24dp.svg'
import sendWhiteIcon from '../../icons/send_white_24dp.svg'
import sendBlackIcon from '../../icons/send_black_24dp.svg'
import emojiWIcon from '../../icons/emoji_emotions_white_24dp.svg'
import emojiBIcon from '../../icons/emoji_emotions_black_24dp.svg'
import { useTheme } from '../Provider/ThemeContext'
import './Input.css';



const Input = (
  { setMessage,
    sendMessage, 
    message, 
    setCameraMode, 
    setMediaMode}) => {

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

  const CameraMode = (e) => {
    e.preventDefault()
    setCameraMode(true)
    setMediaMode(true)
  }
  const UploadMode = (e) => {
    e.preventDefault()
    setMediaMode(true)
  }

  const sendMessageAndCloseEmojiContainer = ( e ) => {
      sendMessage(e)
      setEmojiContainer(e)
  }

  const addEmojiToInput = (event) => {
    setMessage( message + event.target.innerText)
  }

  const darkTheme = useTheme()

  const emojiBgStyle = {
    backgroundColor: darkTheme ? '#0a171f' : '#0d557d'
  }

  const sendContainerStyle = {
    backgroundColor: darkTheme ? '#1f455e' : '#0e9fff'
  }
    
  return (
    display 
    ? ( 
      <div>
        <form 
          style={emojiBgStyle} 
          id="emoji-container"
        >
          <EmojiGrid 
            addEmojiToInput={addEmojiToInput}
          >
          </EmojiGrid>
          <ReactTooltip 
            id="emoji" 
            place="right" 
            effect="solid"
          >
            Emojis 
          </ReactTooltip>
          <ReactTooltip
            id="photo" 
            place="top" 
            effect="solid"
          >
            Take Photo
          </ReactTooltip>
          <ReactTooltip
            id="sent" 
            place="top" 
            effect="solid"
          >
           send message
          </ReactTooltip>
        </form>
        <form 
          style={sendContainerStyle}
          id="send-container"
        >
          <button  
            id="emoji-button" 
            data-tip data-for="emoji" 
            role="img" 
            onClick={e => setEmojiContainer(e)}
          >
            <img src={darkTheme ? emojiWIcon : emojiBIcon} alt="emoji" />
          </button>
          <input 
              type="any"
              className="message-input"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event => event.key === 'Enter' ? sendMessageAndCloseEmojiContainer(event) : null}
          />
          <button 
            type="submit" 
            id="send-button" 
            role="img" 
            data-tip data-for="sent" 
            onClick={e => sendMessageAndCloseEmojiContainer(e)}
            >
              <img src={darkTheme ? sendWhiteIcon : sendBlackIcon} alt="sent" />
            </button>
        </form>
      </div>
      )
    : ( 
        <form id="send-form">
          <div style={sendContainerStyle} id="send-container">
              <button  
                className="look-button" 
                role="img" 
                onClick={e => setEmojiContainer(e)}
              >
                <img src={darkTheme ? emojiWIcon : emojiBIcon} alt="emoji" />
              </button>
              <input 
                  type="text"
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
                <img src={darkTheme ? imgWIcon : imgBIcon} alt="photo" />
              </button>

              <button 
                className="look-button" 
                data-tip data-for="photo"  
                role="img" 
                onClick={e => CameraMode(e)}
              >
                <img src={darkTheme ? camWhiteIcon : camBlackIcon} alt="camera" />
              </button>
          </div>
          <button 
            type="submit" 
            id="send-button" 
            data-tip data-for="sent" 
            role="img" 
            onClick={e => sendMessage(e)}
          >
            <img src={darkTheme ? sendWhiteIcon : sendBlackIcon} alt="sent" />
          </button>
        </form>
      )
)

}
export default Input;