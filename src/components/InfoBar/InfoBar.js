import React from 'react'
import ReactTooltip from "react-tooltip"

import quitWIcon from '../../icons/highlight_off_white_24dp.svg'
import quitBIcon from '../../icons/highlight_off_black_24dp.svg'
import moonIcon from '../../icons/moon.png'
import sunIcon from '../../icons/sun.png'
import { useTheme, useUpdateTheme } from '../Provider/ThemeContext'

import './InfoBar.css'

const InfoBar = ({ room }) => {
  
  const darkTheme = useTheme()
  const toggleTheme = useUpdateTheme()

  const themeStyles = {
    backgroundColor: darkTheme ? '#022031' : '#2cecc5d9',
    color: darkTheme ? '#ccc' : '#000000'
  }

  const imgStyle = {
    height: '2em',
    width: '2em',
    marginRight: '5%'
  }
  const roomNameStyle = {
    marginLeft : '5%'
  }

  return (
    <div 
      className="infoBar" 
      style={themeStyles}
    >
      <div 
        className="leftInnerContainer"
      >
        <a
          href="/" 
          data-tip data-for="close" 
        >
          <img src={darkTheme ? quitWIcon : quitBIcon} alt="close icon" />
        </a>
        <h3 
          style={roomNameStyle}
        >
          {room}
        </h3>
      </div>
      <div 
        className="rightInnerContainer"
      >
        {darkTheme 
          ?
          <img style={imgStyle} src={moonIcon} onClick={toggleTheme} alt="moon icon" />
          :
          <img style={imgStyle} src={sunIcon} onClick={toggleTheme} alt="sun icon" />
        }
      </div>
      <ReactTooltip
        id="close" 
        place="top" 
        effect="solid"
      >
       Quit meeting
      </ReactTooltip>
    </div>
  )
}

export default InfoBar