import React, { useEffect } from 'react'
import Board from '../Board/Board'
import { useState } from 'react';
import { filledElementsOfArray } from '../../utils/gameUtils';

const Game = ({socket,roomCode,handleLeave}) => {

  const [currentPlayer,setCurrentPlayer] = useState(null);
  const [board,setBoard] = useState(Array(9).fill(null));

  useEffect(() => {
    socket.on("recieve_move", (data) => {
      //checks if the board is reset so the text displays right and X/O are assigned right
      if(filledElementsOfArray(data.nextSquares) == 0){
        setCurrentPlayer(null);
      }

      //is someone made the 1st move, set the other player to O
      if(filledElementsOfArray(data.nextSquares) == 1){
        const cp = "O";
        setCurrentPlayer(cp);
      }
      const nextBoard = data.nextSquares;
      setBoard(nextBoard)
    });

  }, [socket])

  const handleCurrentPlayer = (letter) => {
    setCurrentPlayer(letter);
  }

  const handlePlay = (nextSquares) => {
    setBoard(nextSquares)
    sendMove(nextSquares);
  }

  const sendMove = (nextSquares) =>{
    socket.emit("send_move", { nextSquares, roomCode });
  }

  const handleRestart = () => {
    let nextSquares = Array(9).fill(null);
    setBoard(nextSquares);
    setCurrentPlayer(null);
    socket.emit("send_move",{ nextSquares, roomCode })
  }

  return (
    <>
      <button className='leave-button' onClick={() => handleLeave(roomCode)}>Leave game</button>
      <div className="game">
        <Board currentPlayer={currentPlayer} squares={board} onPlay={handlePlay} handleCurrentPlayer={handleCurrentPlayer} handleRestart={handleRestart}/>
      </div>
    </>

  )
}

export default Game