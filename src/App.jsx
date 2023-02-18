import Game from './components/Game/Game'
import JoinRoom from './components/JoinRoom/JoinRoom';
import WaitingRoom from './components/WaitingRoom/WaitingRoom';
import io from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';

const socket = io.connect(import.meta.env.VITE_SERVER_URL);


function App() {

  const [roomCode,setRoomCode] = useState(null);
  const [roomFull,setRoomFull] = useState(false);
  const [opponentLeft,setOpponentLeft] = useState(false);

  useEffect(() => {
    socket.on("start_game", () => {
      setRoomFull(true);
    })

    socket.on("opponent_left", (roomCode) => {
      handleLeave(roomCode);
      setOpponentLeft(true);
      setTimeout(() => {
        setOpponentLeft(false);
      }, 3000);
    })

  },[socket])


  const joinRoom = (inputText) => {
    if(!roomCode && inputText !== undefined){
      setRoomCode(inputText)
      socket.emit("join_room",inputText);
    }
  }

  const handleLeave = (roomCode) => {
    socket.emit("leave_room",roomCode, { priority: "high" });
    setRoomCode(null);
    setRoomFull(false);
  }

  const componentRender = () => {
    if(!roomCode && !roomFull){
      return <JoinRoom socket={socket} handleJoin={joinRoom} opponentLeft={opponentLeft}/>;
    }
    else if(roomCode && !roomFull){
      return <WaitingRoom roomCode={roomCode} handleLeave={handleLeave}/>;
    }
    else if(roomCode && roomFull){
      return <Game socket={socket} roomCode={roomCode} handleLeave={handleLeave}/>;
    }
  }

  return (
    <div className="App">
      {componentRender()}
    </div>
  )
}

export default App 
