import Square from "./Square";
import Modal from './Modal';

import { recordMatch } from '../slices/leaderboardSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Board({xIsNext, squares, onPlay, player1, player2}) {
  const dispatch = useDispatch();
  const nav      = useNavigate();

  const [showModal, setShowModal] = useState(false);

  let st;

  function handleClick(i) 
  {
    if (calculateWinner(squares) || squares[i]) 
    {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) 
    {
      nextSquares[i] = player1.icon;
    } 
    else 
    {
      nextSquares[i] = player2.icon;
    }
    onPlay(nextSquares);
  }


  function checkForDraw(squares) 
  {
    return squares.every(square => square !== null);
  }
  
  const winner = calculateWinner(squares);
  let status;
  if (winner) 
  {
    status = 'Match End With Winner';
  } 
  else if (checkForDraw(squares)) 
  {
    status = 'Draw';
    st = true;
  } 
  else 
  {
    status = `Player Turn: ${xIsNext ? player1.name : player2.name}`;
  }

  useEffect(() => {
    if (winner) 
    {
      dispatch(recordMatch({ p1: player1.id, p2: player2.id, status : "W", playerWin: !xIsNext ? player1.id : player2.id }));
      setShowModal(true);
    }
    else if(st) 
    {
      dispatch(recordMatch({ p1: player1.id, p2: player2.id, status : "D", playerWin: null }));
      setShowModal(true);
    }
  }, [winner, st]);

  return (
    <>
      <div className="status">{status}</div>
      <div className="h-50 w-80 flex flex-col items-center gap-2">
        <div className="board-row flex gap-2">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row flex gap-2">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row flex gap-2">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>


      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <span className="text-slate-900 text-4xl">{status}</span>
            { winner && (<h2 className="text-slate-900">{`Winner: ${!xIsNext ? player1.name : player2.name}`}</h2>) }
            <button className="mt-5" onClick={() => { nav('/') }}>End</button>
        </Modal>
      )}
      
    </>
  );
}

function calculateWinner(squares) 
{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) 
  {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
