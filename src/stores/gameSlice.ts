import { createSlice } from '@reduxjs/toolkit'
import { createInitialBoard } from '../utils/board'
import { type Board, type Player } from '../types'

// GameState is the state of the game
interface GameState {
	board: Board;
	currentPlayer: Player;
	winner: Player | null;
}

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
		resetGame: (state) => {
			state.board = createInitialBoard();
			state.currentPlayer = 'black';
			state.winner = null;
		},
		setCurrentPlayer: (state, action) => {
			state.currentPlayer = action.payload;
		},
			
	}
})  

// Export the actions
export const { setCurrentPlayer, resetGame } = gameSlice.actions;

// Export the reducer
export default gameSlice.reducer;

