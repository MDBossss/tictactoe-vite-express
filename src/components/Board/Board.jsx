import React, { useState,useEffect } from 'react'
import { calculateWinner, filledElementsOfArray } from '../../utils/gameUtils';
import Square from '../Square/Square'

const Board = ({currentPlayer,squares,onPlay,handleCurrentPlayer,handleRestart}) => {

    const [visibleRestart,setVisibleRestart] = useState(false);
    const winner = calculateWinner(squares);

    useEffect(() => {
        if(winner || filledElementsOfArray(squares) == 9){
            setVisibleRestart(true);
        }
        else{
            setVisibleRestart(false);
        }
    },[squares]);

    const handleSquareClick = (index) => {
        if((squares[index] != null) || calculateWinner(squares)){
            return;
        } 
        const nextSquares = squares.slice();

        if(currentPlayer == null){
            handleCurrentPlayer("X");
            nextSquares[index] = "X";
        }
        else{
            nextSquares[index] = currentPlayer;
        }
        onPlay(nextSquares);
    }


    let status;
    if(winner){
        status = "Winner: " + winner;
    }else{
        if(currentPlayer == null){
            status = "Make the first move!";
        }
        else if(filledElementsOfArray(squares) == 9){
            status = "Game tied!";
        }
        else{
            status = "You are: " + currentPlayer;
        }
    }

  return (
    <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)}/>
        </div>
        {visibleRestart && <button className='restart' onClick={handleRestart}>Restart</button>}
    </div>
  )
}

export default Board