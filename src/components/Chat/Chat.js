import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import ReactTooltip from "react-tooltip";


import CameraScreen from '../CameraScreen/CameraScreen';
import UserContainer from '../UserContainer/UserContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';


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
      setUsers(users);
    });
   }, []);

   useEffect(() => {
    socket.on('media', message => {
        setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
   }, []);
   

  const sendMessage = (event) => {
    if(event){
          event.preventDefault();
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
            }).then(res=>res.json())
            .catch(err=>{
                console.log(err);
                alert("error while uploading")
            })
            console.log(datasa.url)
            setPicture(datasa.url)
            console.log(picture)
      }



  const submitData = async() => {
    await fetch("http://localhost:5000/send-data", {
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,
        room,
        picture
      })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      alert(`${data.name} , Your data has been sent to database`)
    })
  }


  

  return (
      cameraMode
      ? (
  
       <CameraScreen sendPhoto={sendPhoto}  setImage={setImage} submitData={submitData} handleUpload={handleUpload} setCameraMode={setCameraMode}></CameraScreen>
        
      )
      : (
        <div className="outerContainer">
          <div className="user-container">
              <div className="logo-head">
                <h1 className="head" data-tip data-for="app" >Group-chat-App</h1>
                <div className="other" data-tip data-for="other" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                  </path>
                </svg>
                </div>

              </div>
              <div className="joining-info">
                  <h3>People in meeting</h3>
              </div>
              {/* <SearchBar /> */}
              <UserContainer room={room} users={users}/>
          </div>
          <div className="message-container">
              <InfoBar room={room} />
              <Messages messages={messages}  name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} cameraMode={cameraMode} setCameraMode={setCameraMode} />
              <ReactTooltip id="other" place="top" effect="solid">
                   Features,Coming Soon!
              </ReactTooltip>
              <ReactTooltip id="app" place="bottom" type="warning" multiline="true" effect="solid">
                   this web app is developed and<br></br>
                    design with ❤️ by Shahid Siddiqui,
                    <br></br>copyright&copy;shahidSiddiqui 2020<br></br>
                    <br></br>
                   To know more about me <br>
                   </br>Go to the my website<br>
                   </br>shaid92.netlify.app
              </ReactTooltip>
          </div>
        </div>
        
      )
  );
}

export default Chat;