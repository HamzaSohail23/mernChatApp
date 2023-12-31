import './App.css';
import Chat from "./Chat.js";
import io from "socket.io-client";
import React, { useState } from "react";


const socket = io.connect("https://hamzachatapp-3aa2956c9e7e.herokuapp.com");
function App() {

  const [ username, setUsername ] = useState("");
  const [ room, setRoom ] = useState("");
  const [ showChat, setShowChat ] = useState(false);


  
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);

    }

  };
  return (
    <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">
        <h3> Join a Chat Now!</h3>
        <input 
          type="text" 
          placeholder="Name..." 
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input 
          type="text" 
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }} 
        />
      
      <button onClick={joinRoom}> Join a Room </button>
      </div>
      )
    : ( 
      <Chat socket={socket} username={username} room={room}/>
    )}

    </div>
  );
}

export default App;
