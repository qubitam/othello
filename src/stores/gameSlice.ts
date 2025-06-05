import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createInitialBoard } from '../utils/board'
import type { GameState, AI_DIFFICULTY, Move } from '../types'
import { getValidMoves, makeMove, isValidMove, calculateScores } from '../utils/gameLogic';
import { createMoveRecord, getNextGameState, BLACK_PLAYER, getPlayerByColor } from '../utils/gameStateHelpers';
import { getBestMoveByFlippedPieces } from '../utils/aiLogic';
import { INITIAL_SCORE, GAME_MODES, AI_DIFFICULTIES } from '../constants/gameConstants';

const initialBoard = createInitialBoard();

// Credits awarded per move
const CREDITS_PER_MOVE = 10;
const HINT_COST = 20;

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
	hintPosition: null,
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
			state.hintPosition = null;
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
			state.hintPosition = null;
			state.gameOver = false;
			state.moveHistory = [];
		},

		// Get hint for current player (costs 20 credits)
		getHint: (state) => {
			const currentPlayerColor = state.currentPlayer.color;
			
			// Check if player has enough credits and it's their turn
			if (state.gameOver || 
				(currentPlayerColor === 'black' && state.playerCredits.black < HINT_COST) ||
				(currentPlayerColor === 'white' && state.playerCredits.white < HINT_COST)) {
				return;
			}

			// Use the existing AI logic to find the best move
			if (state.validMoves.length > 0) {
				const bestMove = getBestMoveByFlippedPieces(state.board, state.validMoves, state.currentPlayer);
				
				// Deduct credits
				if (currentPlayerColor === 'black') {
					state.playerCredits.black -= HINT_COST;
				} else {
					state.playerCredits.white -= HINT_COST;
				}
				
				// Set hint position
				state.hintPosition = bestMove;
			}
		},

		// Make game move and clear hint
		makeGameMove: (state, action: PayloadAction<{ row: number, col: number }>) => {
			const { row, col } = action.payload;

			// Clear any existing hint
			state.hintPosition = null;

			// Early return if move is invalid
			if (!isValidMove(state.board, row, col, state.currentPlayer.color)) {
				return;
			}

			// Award credits to human players only (not AI)
			if (state.gameMode === GAME_MODES.HUMAN_VS_HUMAN) {
				// In human vs human, both players get credits
				if (state.currentPlayer.color === 'black') {
					state.playerCredits.black += CREDITS_PER_MOVE;
				} else {
					state.playerCredits.white += CREDITS_PER_MOVE;
				}
			} else if (state.gameMode === GAME_MODES.HUMAN_VS_AI) {
				// In human vs AI, only human (black) gets credits
				if (state.currentPlayer.color === 'black') {
					state.playerCredits.black += CREDITS_PER_MOVE;
				}
				// White (AI) gets no credits
			}
			// AI vs AI: no credits for anyone

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
			state.isAIThinking = false;
			state.gameOver = true; // This helps stop any ongoing AI operations
		},

		// Set the AI thinking
		setAIThinking: (state, action: PayloadAction<boolean>) => {
			state.isAIThinking = action.payload;
		},

		// Set the AI difficulty
		setAIDifficulty: (state, action: PayloadAction<AI_DIFFICULTY>) => {
			state.aiDifficulty = action.payload;
		},
	}
})  

// Export the actions
export const { startNewGame, resetGame, makeGameMove, showMainMenu, setAIThinking, setAIDifficulty, getHint } = gameSlice.actions;

// Export the reducer
export default gameSlice.reducer;

