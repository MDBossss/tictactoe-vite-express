import React from 'react'

const Room = ({room,roomCode,handleJoinRoom}) => {

  console.log("roomCode:" + roomCode)

  return (
    <div className="room">
      <div className="left">
        <h5>ROOM {roomCode}</h5>
      </div>
      <div className="right">
        {room.numberOfUsers}/2
        {room.numberOfUsers > 1 ? <button className='not-joinable'>FULL</button> : <button className='joinable' onClick={() => handleJoinRoom(roomCode)}>JOIN</button>}
      </div>
    </div>
  )
}

export default Room