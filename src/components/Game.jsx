import React, { useEffect } from 'react'
import Board from './Board'
import { useState } from 'react';
import { filledElementsOfArray } from '../utils/gameUtils';

const Game = ({socket,roomCode}) => {

  const [currentPlayer,setCurrentPlayer] = useState(null);
  const [board,setBoard] = useState(Array(9).fill(null));

  useEffect(() => {
    console.log("currentPlayer prije socketa: " + currentPlayer);
    socket.on("recieve_move", (data) => {
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
    socket.emit("send_move",{ nextSquares, roomCode })
  }

  return (
    <div className="game">
      <Board currentPlayer={currentPlayer} squares={board} onPlay={handlePlay} handleCurrentPlayer={handleCurrentPlayer} handleRestart={handleRestart}/>
    </div>
  )
}

export default Game