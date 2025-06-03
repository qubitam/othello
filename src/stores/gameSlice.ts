import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createInitialBoard } from '../utils/board'
import { type Player, type GameState } from '../types'


// Initial state of the game
const initialState: GameState = {
	board: createInitialBoard(),
	currentPlayer: 'black',
	winner: null,
}

// GameSlice is the slice of the game
const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		// Reset the game
		resetGame: (state) => {
			state.board = createInitialBoard();
			state.currentPlayer = 'black';
			state.winner = null;
		},
		// Set the current player
		setCurrentPlayer: (state, action: PayloadAction<Player>) => {
			state.currentPlayer = action.payload;
		},

		// Place a piece on the board
		placePiece: (state, action: PayloadAction<{ row: number, col: number }>) => {
			// Get the row and column from the payload
			const { row, col } = action.payload;
			// Place the piece on the board
			state.board[row][col] = state.currentPlayer;
			// Switch the current player
			state.currentPlayer = state.currentPlayer === 'black' ? 'white' : 'black';
		}
			
	}
})  

// Export the actions
export const { setCurrentPlayer, resetGame, placePiece } = gameSlice.actions;

// Export the reducer
export default gameSlice.reducer;

