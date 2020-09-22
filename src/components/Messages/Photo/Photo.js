import React from 'react';
import './Photo.css';



const Photo = ({ photo, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  

  if(photo.user === trimmedName) {
    isSentByCurrentUser = true;
  }
   console.log(photo.text)
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <img src={photo.text} className="current-user-sent" />
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <img src={photo.text} className="other-user-sent" />
            </div>
            <p className="sentText pl-10 ">{photo.user}</p>
          </div>
        )
  );
}

export default Photo;