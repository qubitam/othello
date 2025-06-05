import type { Board, Player, Move } from '../types';
import { getValidMoves, getWinner, getOpponent } from './gameLogic';

// Helper to create a move record
export const createMoveRecord = (player: Player, row: number, col: number): Move => ({
  player,
  position: { row, col },
  timestamp: Date.now(),
});

// Helper to determine next game state after a move
export const getNextGameState = (board: Board, currentPlayer: Player) => {
  const nextPlayer = getOpponent(currentPlayer);
  const nextValidMoves = getValidMoves(board, nextPlayer);
  
  // If next player has moves, switch to them
  if (nextValidMoves.length > 0) {
    return {
      currentPlayer: nextPlayer,
      validMoves: nextValidMoves,
      gameOver: false,
      winner: null as Player | null,
    };
  }
  
  // Check if current player still has moves
  const currentValidMoves = getValidMoves(board, currentPlayer);
  if (currentValidMoves.length > 0) {
    return {
      currentPlayer,
      validMoves: currentValidMoves,
      gameOver: false,
      winner: null as Player | null,
    };
  }
  
  // No moves for either player - game over
  return {
    currentPlayer,
    validMoves: [],
    gameOver: true,
    winner: getWinner(board),
  };
}; 