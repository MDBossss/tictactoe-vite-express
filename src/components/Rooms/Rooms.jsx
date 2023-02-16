import React, { useEffect, useState } from 'react'
import Room from '../Room/Room';
import { GrFormRefresh } from "react-icons/gr";

const Rooms = ({socket,handleJoinRoom}) => {

    const [roomData,setRoomData] = useState([]);


    useEffect(() => {
        handleTestRooms();

        socket.on("recieve_rooms", (roomsMapJSON) => {
            const jsonArray = JSON.parse(roomsMapJSON)
            const roomsMap = new Map(Array.from(jsonArray));
            setRoomData(roomsMap);
        })
    },[socket])

    
    const handleTestRooms = ()  => {
      socket.emit("get_rooms");
    }

  return (
    <div className="rooms">
      <div className="available-rooms">
        <h4>Available rooms</h4>
        <button className='refresh-button' onClick={handleTestRooms}><GrFormRefresh/></button>
      </div>
      {Array.from(roomData).length > 1 ? null : <p>No rooms available</p>}
      {Array.from(roomData).map(([key,value]) => key != undefined ? <Room key={key} room={value} roomCode={key} handleJoinRoom={handleJoinRoom}/> : null)}
    </div>
  )
}

export default Rooms