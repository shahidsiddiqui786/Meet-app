import React from 'react';
import ReactTooltip from "react-tooltip";

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" data-tip data-for="close" ><img src={closeIcon} alt="close icon" /></a>
    </div>
    <ReactTooltip id="close" place="top" effect="solid">
                   Quit meeting
    </ReactTooltip>
  </div>
);

export default InfoBar;