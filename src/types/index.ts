// Player can be black, white or empty (empty is used for empty cells)
export type Player  = 'black' | 'white' | 'empty'

// Board is a 2D array of Player
export type Board = Player[][];

// GameState is the state of the game
export type GameState = {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
}

// Board size is 8x8
export const BOARD_SIZE = 8;