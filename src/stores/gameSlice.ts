import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createInitialBoard } from '../utils/board'
import type { GameState, AI_DIFFICULTY, Move } from '../types'
import { getValidMoves, makeMove, isValidMove, calculateScores } from '../utils/gameLogic';
import { createMoveRecord, getNextGameState, BLACK_PLAYER, getPlayerByColor } from '../utils/gameStateHelpers';
import { INITIAL_SCORE, GAME_MODES, AI_DIFFICULTIES } from '../constants/gameConstants';

const initialBoard = createInitialBoard();

// Credits awarded per move
const CREDITS_PER_MOVE = 10;

// Initial state of the game
const initialState: GameState = {
	board: initialBoard,
	currentPlayer: BLACK_PLAYER,
	winner: null,
	validMoves: getValidMoves(initialBoard, 'black'),
	score: {
		black: INITIAL_SCORE.BLACK,
		white: INITIAL_SCORE.WHITE,
	},
	playerCredits: {
		black: 0,
		white: 0,
	},
	gameOver: false,
	gameMode: GAME_MODES.HUMAN_VS_HUMAN,
	gameStarted: false,
	isAIThinking: false,
	aiDifficulty: AI_DIFFICULTIES.MEDIUM,
	moveHistory: [] as Move[],
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
			state.currentPlayer = BLACK_PLAYER;
			state.validMoves = getValidMoves(newBoard, state.currentPlayer.color);
			state.score = calculateScores(newBoard);
			state.playerCredits = { black: 0, white: 0 };
			state.gameOver = false;
			state.winner = null;
			state.gameMode = mode;
			state.gameStarted = true;
			if (aiDifficulty) {
				state.aiDifficulty = aiDifficulty;
			}
			state.moveHistory = [];
		},

		// Reset the game
		resetGame: (state) => {
			state.board = createInitialBoard();
			state.currentPlayer = BLACK_PLAYER;
			state.winner = null;
			state.validMoves = getValidMoves(state.board, state.currentPlayer.color);
			state.score = calculateScores(state.board);
			state.playerCredits = { black: 0, white: 0 };
			state.gameOver = false;
			state.moveHistory = [];
		},

		// Place a piece on the board (refactored to be shorter)
		makeGameMove: (state, action: PayloadAction<{ row: number, col: number }>) => {
			const { row, col } = action.payload;

			// Early return if move is invalid
			if (!isValidMove(state.board, row, col, state.currentPlayer.color)) {
				return;
			}

			// Award credits to the current player for making a move
			if (state.currentPlayer.color === 'black') {
				state.playerCredits.black += CREDITS_PER_MOVE;
			} else if (state.currentPlayer.color === 'white' && state.gameMode === GAME_MODES.HUMAN_VS_HUMAN) {
				state.playerCredits.white += CREDITS_PER_MOVE;
			}

			// Record the move
			const move = createMoveRecord(state.currentPlayer, row, col);
			state.moveHistory.push(move);

			// Make the move on the board
			state.board = makeMove(state.board, row, col, state.currentPlayer.color);

			// Determine next game state
			const nextState = getNextGameState(state.board, state.currentPlayer);
			
			// Update current player based on next player color
			state.currentPlayer = getPlayerByColor(nextState.nextPlayerColor);
			
			state.validMoves = nextState.validMoves;
			state.gameOver = nextState.gameOver;
			state.winner = nextState.winner;

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

