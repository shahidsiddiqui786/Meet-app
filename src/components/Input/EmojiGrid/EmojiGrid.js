import React from 'react';
import Emoji from './Emoji/Emoji'

import './EmojiGrid.css';

let emoji = require("node-emoji");


const EmojiGrid = ({  addEmojiToInput }) => {
  // emoji.search('').map((item) => {
  //     return  console.log(item.emoji)
  //   })
    

  return (
            <div id="emoji-grid">
                {emoji.search('').map((emojiElement) => {
                return <Emoji key={emojiElement.key}  addEmojiToInput={addEmojiToInput} emoji={emojiElement.emoji}></Emoji>
                } )}
            </div>
)

}
export default EmojiGrid;