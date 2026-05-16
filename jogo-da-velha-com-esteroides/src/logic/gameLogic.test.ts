import { describe, it, expect } from 'vitest';
import { getInitialState, makeMove } from './gameLogic';

describe('Game Logic', () => {
  it('should initialize with correct state', () => {
    const state = getInitialState();
    expect(state.board.every(cell => cell === null)).toBe(true);
    expect(state.currentPlayer).toBe('X');
    expect(state.winner).toBe(null);
    expect(state.isDraw).toBe(false);
  });

  it('should switch player after valid move', () => {
    let state = getInitialState();
    state = makeMove(state, 0); // X plays
    expect(state.board[0]).toBe('X');
    expect(state.currentPlayer).toBe('O');

    state = makeMove(state, 1); // O plays
    expect(state.board[1]).toBe('O');
    expect(state.currentPlayer).toBe('X');
  });

  it('should not allow move on occupied cell', () => {
    let state = getInitialState();
    state = makeMove(state, 0); // X plays
    const stateAfterInvalidMove = makeMove(state, 0); // O tries to play on same cell
    
    expect(stateAfterInvalidMove).toBe(state); // Should return same object reference
    expect(stateAfterInvalidMove.currentPlayer).toBe('O'); // Turn didn't change
  });

  it('should detect horizontal win', () => {
    let state = getInitialState();
    state = makeMove(state, 0); // X
    state = makeMove(state, 3); // O
    state = makeMove(state, 1); // X
    state = makeMove(state, 4); // O
    state = makeMove(state, 2); // X wins

    expect(state.winner).toBe('X');
    expect(state.isDraw).toBe(false);
  });

  it('should detect vertical win', () => {
    let state = getInitialState();
    state = makeMove(state, 0); // X
    state = makeMove(state, 1); // O
    state = makeMove(state, 3); // X
    state = makeMove(state, 2); // O
    state = makeMove(state, 6); // X wins

    expect(state.winner).toBe('X');
    expect(state.isDraw).toBe(false);
  });

  it('should detect diagonal win', () => {
    let state = getInitialState();
    state = makeMove(state, 0); // X
    state = makeMove(state, 1); // O
    state = makeMove(state, 4); // X
    state = makeMove(state, 2); // O
    state = makeMove(state, 8); // X wins

    expect(state.winner).toBe('X');
    expect(state.isDraw).toBe(false);
  });

  it('should detect draw', () => {
    let state = getInitialState();
    // X O X
    // X X O
    // O X O
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moves.forEach(move => {
      state = makeMove(state, move);
    });

    expect(state.winner).toBe(null);
    expect(state.isDraw).toBe(true);
  });

  it('should not allow move after game is won', () => {
    let state = getInitialState();
    // X wins on top row
    state = makeMove(state, 0); // X
    state = makeMove(state, 3); // O
    state = makeMove(state, 1); // X
    state = makeMove(state, 4); // O
    state = makeMove(state, 2); // X wins

    const stateAfterWin = makeMove(state, 5); // Try to play after win
    expect(stateAfterWin).toBe(state); // Should return same state
  });
});
