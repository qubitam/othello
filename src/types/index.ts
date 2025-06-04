// Player can be black, white or empty (empty is used for empty cells)
export type Player  = 'black' | 'white' | 'empty'

// Board is a 2D array of Player
export type Board = Player[][];

// GameState is the state of the game
export type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  validMoves: Position[];
  score: {
    black: number;
    white: number;
  };
  gameOver: boolean;
  gameMode: string;
  gameStarted: boolean;
  isAIThinking: boolean;
  aiDifficulty: AI_DIFFICULTY;
}

// Position is the position of the piece on the board
export type Position = {
  row: number;
  col: number;
}

// Board size is 8x8
export const BOARD_SIZE = 8;

// AI difficulty
export type AI_DIFFICULTY = 'easy' | 'medium' | 'hard';