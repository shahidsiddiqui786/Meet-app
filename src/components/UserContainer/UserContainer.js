import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import onlineIcon from '../../icons/onlineIcon.png';
import './TextContainer.css';

const TextContainer = ({ room, users }) => (
          users
            ? (
            <ScrollToBottom >
              <div className="user-list">
                <div className="activeContainer">
                    {users.map(({name}) => (
                      <div key={name} className="activeItem">
                        <div key={name} className="user-name">
                         {name}
                        </div>
                        <hr></hr>
                      </div>
                    ))}
                </div>
              </div>
            </ScrollToBottom>
            )
            : null
);

export default TextContainer;