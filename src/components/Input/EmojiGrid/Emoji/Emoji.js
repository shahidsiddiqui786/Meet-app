import React, { useState } from 'react';


import './Emoji.css';


const Emoji = ({  addEmojiToInput, emoji }) => {
    
  return (
         <div  
         className="emoji"
         onClick={e => addEmojiToInput(e)}
         >{emoji}
         </div>    
)

}
export default Emoji;