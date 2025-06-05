import type { Board, Player, Move, PieceColor } from '../types';
import { getValidMoves, getWinner, getOpponent } from './gameLogic';

// Helper to create a player object dynamically
export const createPlayer = (color: PieceColor): Player => ({
  id: color,
  color,
});

// Pre-created player instances for the game (simple and clean)
export const BLACK_PLAYER: Player = {
  id: 'black',
  color: 'black',
};

export const WHITE_PLAYER: Player = {
  id: 'white',
  color: 'white',
};

// Helper to get player by color
export const getPlayerByColor = (color: PieceColor): Player => {
  return color === 'black' ? BLACK_PLAYER : WHITE_PLAYER;
};

// Helper to create a move record
export const createMoveRecord = (player: Player, row: number, col: number): Move => ({
  player,
  gamePiece: { color: player.color, row, col },
  timestamp: Date.now(),
});

// Helper to determine next game state after a move
export const getNextGameState = (board: Board, currentPlayer: Player) => {
  const nextPlayerColor = getOpponent(currentPlayer.color);
  const nextValidMoves = getValidMoves(board, nextPlayerColor);
  
  // Returns next player's color and valid moves
  if (nextValidMoves.length > 0) {
    return {
      nextPlayerColor,
      validMoves: nextValidMoves,
      gameOver: false,
      winner: null as PieceColor | null,
    };
  }
  
  // Check if current player still has moves
  const currentValidMoves = getValidMoves(board, currentPlayer.color);
  if (currentValidMoves.length > 0) {
    return {
      nextPlayerColor: currentPlayer.color,
      validMoves: currentValidMoves,
      gameOver: false,
      winner: null as PieceColor | null,
    };
  }
  
  // No moves for either player - game over
  return {
    nextPlayerColor: currentPlayer.color,
    validMoves: [],
    gameOver: true,
    winner: getWinner(board),
  };
}; 