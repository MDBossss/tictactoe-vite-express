import React from 'react'

const WaitingRoom = ({roomCode}) => {
  return (
    <div className="waiting-room">
        <h2>Waiting for opponent...</h2>
        <p>code: {roomCode}</p>
    </div>
  )
}

export default WaitingRoom