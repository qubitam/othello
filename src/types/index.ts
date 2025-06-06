// Piece colors for the board
export type PieceColor = 'black' | 'white' | 'empty'

// Player object for game identification
export interface Player {
  id: string;
  color: PieceColor;
}

// Game piece that holds color and position
export interface GamePiece {
  color: PieceColor;
  row: number;
  col: number;
}

// Board is a 2D array of GamePiece
export type Board = GamePiece[][];

// GameState is the state of the game
export type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: PieceColor | null;
  validMoves: Position[];
  score: {
    black: number;
    white: number;
  };
  playerCredits: {
    black: number;
    white: number;
  };
  hintPosition: Position | null;
  gameOver: boolean;
  gameMode: string;
  gameStarted: boolean;
  isAIThinking: boolean;
  aiDifficulty: AI_DIFFICULTY;
  moveHistory: Move[];
  // History navigation
  historyViewIndex: number; // -1 means current game, 0+ means viewing that move
  isViewingHistory: boolean;
}

// Position is the position of a piece on the board
export type Position = {
  row: number;
  col: number;
}

// Board size is 8x8
export const BOARD_SIZE = 8;

// AI difficulty
export type AI_DIFFICULTY = 'easy' | 'medium' | 'hard';

// Move is the move made by the player
export interface Move {
  player: Player;
  gamePiece: GamePiece;
  timestamp: number;
}