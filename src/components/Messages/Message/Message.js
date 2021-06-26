import React from 'react';
import { useTheme } from '../../Provider/ThemeContext'
import './Message.css';


const Message = ({ message: { text, user, media }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const darkTheme = useTheme()

  const msgBoxBlueStyle = {
    backgroundColor: darkTheme ? '#2858a5' : '#7ecfea',
    color: darkTheme ? '#fff' : '#000036'
  }

  const msgBoxLightStyle = {
    backgroundColor: darkTheme ? '#75838a' : '#5fe498',
    color: darkTheme ? '#fff' : '#000060'
  }

  const sentTextStyle = {
    color: darkTheme ? '#857b7b' : '#030317'
  }

  // const bgBlueStyle = {
  //   backgroundColor: darkTheme ? '#03304a' : '#2858a5',
  //   color: darkTheme #857b7b ? '#00D4D4' : '#222'
  // }


  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div style={msgBoxBlueStyle} className="messageBox">
            { media && 
              <img className="image" src={text} alt={text} /> }
            { !media && 
              <p className="messageText">{text} </p> }
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div style={msgBoxLightStyle} className="messageBox">
              { media && 
               <img className="image" src={text} alt={text} /> }
            { !media && 
              <p className="messageText">{text} </p> }
            </div>
            <p style={sentTextStyle} className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message