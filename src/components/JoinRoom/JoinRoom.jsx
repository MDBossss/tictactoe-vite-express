import React, { useState } from 'react'
import Rooms from '../Rooms/Rooms';

const JoinRoom = ({socket,handleJoin,opponentLeft}) => {

    const [inputText,setInputText] = useState();

  return (
    <div className="join-room">
        <h2>code</h2>
        <input type="text" onChange={(e) => setInputText(e.target.value)}/>
        <button onClick={() => handleJoin(inputText)}>Join room</button>
        {opponentLeft && <p>Opponent left the game...</p>}
        <Rooms socket={socket} handleJoinRoom={handleJoin}/>
    </div>
  )
}

export default JoinRoom