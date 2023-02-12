import React, { useState } from 'react'

const JoinRoom = ({handleJoin}) => {

    const [inputText,setInputText] = useState();

  return (
    <div className="join-room">
        <h2>code</h2>
        <input type="text" onChange={(e) => setInputText(e.target.value)}/>
        <button onClick={() => handleJoin(inputText)}>Join room</button>
    </div>
  )
}

export default JoinRoom