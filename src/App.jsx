import './App.css'
import Game from './components/Game'
import JoinRoom from './components/JoinRoom';
import io from "socket.io-client";
import { useState } from 'react';

const socket = io.connect("https://tictactoe-vite-express-api.vercel.app:5000");


function App() {

  const [roomCode,setRoomCode] = useState(null);


  const joinRoom = (inputText) => {
    if(!roomCode){
      setRoomCode(inputText)
      socket.emit("join_room",inputText);
    }
  }

  return (
    <div className="App">
      {roomCode === null ? <JoinRoom handleJoin={joinRoom}/> : <Game socket={socket} roomCode={roomCode}/>}
    </div>
  )
}

export default App // availabe to access outside the file
