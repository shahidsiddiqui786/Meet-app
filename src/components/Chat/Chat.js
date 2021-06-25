import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import ReactTooltip from "react-tooltip";


import CameraScreen from '../Media/CameraScreen'
import ImageUpload from '../Media/ImageUpload'
import UserContainer from '../UserContainer/UserContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { useTheme } from '../Provider/ThemeContext'


import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState('');
  const [mediaMode, setMediaMode] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);

  // const ENDPOINT = 'http://localhost:5000/';
   const ENDPOINT = 'https://real-chat-app-by-shahid.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    if(!name||!room){
      alert("you must provide a valid name & room to enter for chat!")
      window.location.href="./"
    }

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
        window.location.href="./"
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users)
    });
   }, []);

   useEffect(() => {
    socket.on('media', message => {
        setMessages(messages => [ ...messages, message ])
    })
    
    socket.on("roomData", ({ users }) => {
      setUsers(users)
    })
   }, [])
   

  const sendMessage = (event) => {
    if(event){
      event.preventDefault()
    }
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const sendPhoto = () => {
    if(picture) {
      socket.emit('sendPhoto', picture, () => setPicture(''));
    }
  }

    

  const handleUpload = async()=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','chatapp')
    data.append("cloud_name","shahiba")

    const datasa =  await fetch("https://api.cloudinary.com/v1_1/shahiba/image/upload",{
          method:"post",
          body:data
    })
    .then(res=>res.json())
    .catch(err=>{
          alert("error while uploading")
    })
    setPicture(datasa.url) 
  }
  // const submitData = () => {
  //     fetch("http://localhost:5000/send-data", {
  //     method:"post",
  //     headers:{
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({
  //       name,
  //       room,
  //       picture
  //     })
  //   })
  // }
  
  const darkTheme = useTheme()

  const outerStyle = {
    backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
    color: darkTheme ? '#00D4D4' : '#222'
  }

  const userStyle = {
    backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
    color: darkTheme ? '#00D4D4' : '#222'
  }

  const messageStyle = {
    backgroundColor: darkTheme ? '#03304a' : '#1b76aa',
    color: darkTheme ? '#00D4D4' : '#222'
  }
  const infoStyle = {
    backgroundColor: darkTheme ? '#022032' : '#16577d',
    color: darkTheme ? '#E4F1FE' : '#00fa9a'
  }
  const logoStyle = {
    color: darkTheme ? '#19B5FE' : '#00fa9a'
  }

  

  return (

    mediaMode ?
      cameraMode ?
        <CameraScreen 
          sendPhoto={sendPhoto} 
          setImage={setImage} 
          handleUpload={handleUpload} 
          setMediaMode={setMediaMode}
          setCameraMode={setCameraMode}
        />
      :
        <ImageUpload 
          sendPhoto={sendPhoto}
          setImage={setImage}
          handleUpload={handleUpload}
          setMediaMode={setMediaMode} 
        />
    :
    
      <div style={outerStyle} className="outerContainer">
        <div style={userStyle} className="user-container">
          <div style={infoStyle} className="users-info">
            <h2 style={logoStyle} className="logo"><u>Group-Chat</u></h2>
            <h4>Active Chatter in Room {room}</h4>
          </div>
          <UserContainer  users={users}/>
        </div>
        <div style={messageStyle} className="message-container">
            <InfoBar room={room} />
            <Messages 
              messages={messages}  
              name={name} 
            />
            <Input 
              message={message} 
              setMessage={setMessage} 
              sendMessage={sendMessage}
              setCameraMode={setCameraMode}
              setMediaMode = {setMediaMode} 
            />
            {/* <ReactTooltip id="other" place="top" effect="solid">
                Features,Coming Soon!
            </ReactTooltip>
            <ReactTooltip id="app" place="bottom" type="info" multiline="true" effect="solid">
                this web app is developed and<br></br>
                  design with ❤️ by Shahid Siddiqui,
                  <br></br>copyright&copy;shahidSiddiqui 2020<br></br>
                  <br></br>
                To know more about me <br>
                </br>Go to the my website<br>
                </br>shaid92.netlify.app
            </ReactTooltip> */}
        </div>
      </div>
  )
}

export default Chat;