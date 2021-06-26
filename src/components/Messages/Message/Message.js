import React from 'react';

import './Message.css';


const Message = ({ message: { text, user, media }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }


  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            { media && 
              <img className="image" src={text} alt={text} /> }
            { !media && 
              <p className="messageText">{text} </p> }
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              { media && 
               <img className="image" src={text} alt={text} /> }
            { !media && 
              <p className="messageText">{text} </p> }
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;