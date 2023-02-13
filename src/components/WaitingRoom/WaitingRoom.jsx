import React from 'react'

const WaitingRoom = ({roomCode,handleLeave}) => {

  return (
    <div className="waiting-room">
        <h2>Waiting for opponent...</h2>
        <p>code: {roomCode}</p>
        <button onClick={() => handleLeave(roomCode)}>Leave game</button>
    </div>
  )
}

export default WaitingRoom