import { useState, useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setClickCount((prev) => prev + 1);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setClickCount(0);
  }

  function incrementByTwo() {
    setClickCount((prev) => prev + 2);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  useEffect(() => {
    console.log(`Click Count: ${clickCount}`);
    if (clickCount >= 100) {
      document.body.style.background = "red";
      document.body.style.transition = "background 0.2s ease-in-out";
      setTimeout(() => {
        alert("💥 BOOM! GAME OVER! 💥");
        resetGame();
        document.body.style.background = "";
      }, 500);
    }
  }, [clickCount]);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={() => setClickCount((prev) => prev + 1)}>Click</button>
        <button onClick={incrementByTwo}>Double Click</button>
        <p>Click Count: {clickCount}</p>
        {clickCount > 10 && <p>You are so good at clicking!</p>}
        {clickCount > 20 && <p>You can stop clicking!!</p>}
        {clickCount > 30 && <p>Too much clicking!!!</p>}
        {clickCount > 40 && <p>Okay you can stop now!!!!</p>}
        {clickCount > 50 && <p>Seriously please reset!!!!!</p>}
        {clickCount > 60 && <p>Okay you asked for it...</p>}
        {clickCount > 70 && <p>Don't say I didn't warn you...</p>}
        {clickCount > 80 && <p>It's been a good run.</p>}
        {clickCount > 90 && <p>You really are mean.</p>}
        {clickCount > 100 && <p> 💥 GAME OVER 💥 </p>}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
