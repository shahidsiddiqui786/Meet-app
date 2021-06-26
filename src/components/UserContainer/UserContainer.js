import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './UserContainer.css';
import { useTheme } from '../Provider/ThemeContext'

const UserContainer = ({  users }) => {

  const darkTheme = useTheme()

  const profileStyle = {
    backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
    color: darkTheme ? '#00D4D4' : '#222'
  }

  const userStyle = {
    backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
    color: darkTheme ? '#00D4D4' : '#222'
  } 
  const activeItemStyle = {
    backgroundColor: darkTheme ? 'rgb(6, 3, 51)' : '#2f52e6',
    color: darkTheme ? '#00D4D4' : '#222'
  }    

return (
  users
    ? (
    <ScrollToBottom >
      <div style={userStyle} className="user-list">
        <div className="activeContainer">
            {users.map(({name}) => (
              <div style={activeItemStyle} key={name} className="activeItem">
                <div className="user-profile">
                  <div style={profileStyle} key={name.charAt(0)} className="photo-profile">
                    <strong>{name.charAt(0)}</strong>
                  </div>
                  <div key={name} className="user-name">
                  {name.substring(0,8)}
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}
        </div>
      </div>
    </ScrollToBottom>
    )
    : 
    <h2>Hey , No One here!</h2>
  )
}


export default UserContainer;