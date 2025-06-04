import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createInitialBoard } from '../utils/board'
import type { GameState, AI_DIFFICULTY } from '../types'
import { getValidMoves, makeMove, getWinner, isValidMove, getOpponent, calculateScores } from '../utils/gameLogic';

const initialBoard = createInitialBoard();

// Initial state of the game
const initialState: GameState = {
	board: initialBoard,
	currentPlayer: 'black',
	winner: null,
	validMoves: getValidMoves(initialBoard, 'black'),
	score: {
		black: 2,
		white: 2,
	},
	gameOver: false,
	gameMode: 'human_vs_human',
	gameStarted: false,
	isAIThinking: false,
	aiDifficulty: 'medium',
}

// GameSlice is the slice of the game
const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		// Start the game
		startNewGame: (state, action: PayloadAction<{ mode: string, aiDifficulty?: AI_DIFFICULTY }>) => {
			const { mode, aiDifficulty } = action.payload;

			const newBoard = createInitialBoard();
			state.board = newBoard;
			state.currentPlayer = 'black';
			state.validMoves = getValidMoves(newBoard, state.currentPlayer);
			state.score = calculateScores(newBoard);
			state.gameOver = false;
			state.winner = null;
			state.gameMode = mode;
			state.gameStarted = true;
			if (aiDifficulty) {
				state.aiDifficulty = aiDifficulty;
			}
		},

		// Reset the game
		resetGame: (state) => {
			state.board = createInitialBoard();
			state.currentPlayer = 'black';
			state.winner = null;
			state.validMoves = getValidMoves(state.board, state.currentPlayer);
			state.score = calculateScores(state.board);
			state.gameOver = false;
		},

		// Place a piece on the board
		makeGameMove: (state, action: PayloadAction<{ row: number, col: number }>) => {
			// Get the row and column from the payload
			const { row, col } = action.payload;

			// Check if the move is valid
			if (!isValidMove(state.board, row, col, state.currentPlayer)) {
				return;
			}

			// Make the move
			state.board = makeMove(state.board, row, col, state.currentPlayer);

			// Switch the current player
			const nextPlayer = getOpponent(state.currentPlayer);
			const nextValidMoves = getValidMoves(state.board, nextPlayer);

			// If there are valid moves, switch to the next player
			if (nextValidMoves.length > 0) {
				state.currentPlayer = nextPlayer;
				state.validMoves = nextValidMoves;
			} else {
				// Check if the current player has valid moves if not, the game is over
				const currentMoves = getValidMoves(state.board, state.currentPlayer);
				// If there are valid moves, switch to the current player
				if (currentMoves.length > 0) {
					state.validMoves = currentMoves;
				} else {
					state.validMoves = [];
					state.winner = getWinner(state.board);
					state.gameOver = true;
				}
			}

			// Update the score
			state.score = calculateScores(state.board);
		},

		// Show main menu 
		showMainMenu: (state) => {
			state.gameStarted = false;
		},

		// Set the AI thinking
		setAIThinking: (state, action: PayloadAction<boolean>) => {
			state.isAIThinking = action.payload;
		},

		// Set the AI difficulty
		setAIDifficulty: (state, action: PayloadAction<AI_DIFFICULTY>) => {
			state.aiDifficulty = action.payload;
		}
	}
})  

// Export the actions
export const { startNewGame, resetGame, makeGameMove, showMainMenu, setAIThinking, setAIDifficulty } = gameSlice.actions;

// Export the reducer
export default gameSlice.reducer;

