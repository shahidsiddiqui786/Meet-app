import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './TextContainer.css';

const TextContainer = ({  users }) => {
        return (
          users
            ? (
            <ScrollToBottom >
              <div className="user-list">
                <div className="activeContainer">
                    {users.map(({name}) => (
                      <div key={name} className="activeItem">
                        <div className="user-profile">
                          <div key={name.charAt(0)} className="photo-profile">
                            <strong>{name.charAt(0)}</strong>
                          </div>
                          <div key={name} className="user-name">
                          {name}
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                    ))}
                </div>
              </div>
            </ScrollToBottom>
            )
            : null
          )
      }


export default TextContainer;