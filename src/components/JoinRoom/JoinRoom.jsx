import React, { useState } from 'react';
import Rooms from '../Rooms/Rooms';
import {BsGithub} from "react-icons/bs";

const JoinRoom = ({socket,handleJoin,opponentLeft}) => {

    const [inputText,setInputText] = useState();

  return (
    <div className="join-room">
        <a href="https://github.com/MDBossss" target="_blank" className='github'><BsGithub className='icon'/></a>
        <h2>code</h2>
        <input type="text" onChange={(e) => setInputText(e.target.value)}/>
        <button onClick={() => handleJoin(inputText)} className="join-button">Join room</button>
        {opponentLeft && <p>Opponent left the game...</p>}
        <Rooms socket={socket} handleJoinRoom={handleJoin}/>
    </div>
  )
}

export default JoinRoom