import { useState } from 'react';
import './App.css';
import { getInitialState, makeMove } from './logic/gameLogic';

function App() {
  const [gameState, setGameState] = useState(getInitialState());

  const handleCellClick = (index: number) => {
    setGameState(prevState => makeMove(prevState, index));
  };

  const handleReset = () => {
    setGameState(getInitialState());
  };

  return (
    <div className="app">
      <h1>Jogo da Velha</h1>
      
      <div className="status">
        {gameState.winner ? (
          <h2 className="win">Vencedor: {gameState.winner} 🎉</h2>
        ) : gameState.isDraw ? (
          <h2 className="draw">Empate! Deu Velha. 🤷‍♂️</h2>
        ) : (
          <h2>Vez do Jogador: <span className={gameState.currentPlayer.toLowerCase()}>{gameState.currentPlayer}</span></h2>
        )}
      </div>

      <div className="board">
        {gameState.board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? cell.toLowerCase() : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || gameState.winner !== null}
            aria-label={`Casa ${index}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={handleReset}>
        Reiniciar Jogo
      </button>
    </div>
  );
}

export default App;
