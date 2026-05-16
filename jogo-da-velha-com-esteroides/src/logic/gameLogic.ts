export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  winner: CellValue;
  isDraw: boolean;
}

export const getInitialState = (): GameState => ({
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
});

export const calculateWinner = (board: BoardState): CellValue => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6],            // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const makeMove = (state: GameState, index: number): GameState => {
  // Prevent move if cell is taken or game is already won
  if (state.board[index] !== null || state.winner !== null) {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  const winner = calculateWinner(newBoard);
  const isDraw = !winner && !newBoard.includes(null);

  return {
    board: newBoard,
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    winner,
    isDraw,
  };
};
