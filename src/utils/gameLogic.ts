import type { Board, PieceColor, Move } from '../types';
import { BOARD_SIZE } from '../types';
import { createInitialBoard } from './board';
import cellSound from '../assets/cell_sound.mp3';

// Get opposite piece color
export const getOpponent = (color: PieceColor): PieceColor => {
	return color === 'black' ? 'white' : 'black';
};

// Check if a move is on the board
export const isOnBoard = (row: number, col: number): boolean => {
	return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

// Note ** AI Helped in fixing my direction array **
// Directions to check
export const directions = [
	[-1, -1], // Top-left
	[-1, 0],  // Top
	[-1, 1],  // Top-right
	[0, -1],  // Left
	[0, 1],   // Right
	[1, -1],  // Bottom-left
	[1, 0],   // Bottom
	[1, 1],   // Bottom-right
];

// Note ** AI Helped in making this function **
// Initially this function was hard coded and placed in the isValidMove function
// It was a bit messy and hard to maintain, so I decided to move it to a separate function
export const checkDirection = (
	board: Board,
	row: number,
	col: number,
	direction: number[],
	color: PieceColor
): { row: number; col: number }[] => {
	const opponent = getOpponent(color);
	const toFlip = [];

	// Start from the next position
	let r = row + direction[0];
	let c = col + direction[1];

	// Check if the move is on the board    
	while (isOnBoard(r, c) && board[r][c].color === opponent) {
		toFlip.push({row: r, col: c});
		r += direction[0];
		c += direction[1];
	}

	// If the move is on the board and the cell is the player's color, return the cells to flip
	if (isOnBoard(r, c) && board[r][c].color === color && toFlip.length > 0) {
		return toFlip;
	}

	// If the move is not on the board or the cell is not the player's color, return an empty array
	return [];
}

// Get all valid moves
export const getValidMoves = (
	board: Board, color: PieceColor
) => {
	const validMoves = [];

	for (let row = 0; row < BOARD_SIZE; row++) {
		for (let col = 0; col < BOARD_SIZE; col++) {
			if (isValidMove(board, row, col, color)) {
				validMoves.push({row, col});
			}
		}
	}

	return validMoves;
}

// Check if a move is valid
export const isValidMove = (
	board: Board,
	row: number,
	col: number,
	color: PieceColor
): boolean => {

	// Check if the cell is empty
	if (board[row][col].color !== 'empty') return false;
	
	// Check all directions
	return directions.some((direction) => {
		return checkDirection(board, row, col, direction, color).length > 0;
	});
}

// Make a move
export const makeMove = (
	board: Board, row: number, col: number, color: PieceColor
): Board => {
	const newBoard = board.map(row => row.map(piece => ({ ...piece })));

	newBoard[row][col] = { color, row, col };

	// Flip pieces
	for (const direction of directions) {
		const toFlip = checkDirection(board, row, col, direction, color);
		for (const {row: flipRow, col: flipCol} of toFlip) {
			newBoard[flipRow][flipCol] = { color, row: flipRow, col: flipCol };
		}
	}

	return newBoard;
}

// Get the winner
export const getWinner = (board: Board): PieceColor | null => {
	const { black, white } = calculateScores(board);

	if (black > white) return 'black';
	if (white > black) return 'white';

	return null;
}

// Calculate the scores
export const calculateScores = (board: Board): { black: number, white: number } => {
	const blackCount = board.flat().filter(piece => piece.color === 'black').length;
	const whiteCount = board.flat().filter(piece => piece.color === 'white').length;

	return { black: blackCount, white: whiteCount };
}

// Play cell sound
export const playCellSound = () => {
	const audio = new Audio(cellSound);
	audio.play();
}

// Reconstruct board state at a specific point in history
export const getBoardAtHistoryIndex = (moveHistory: Move[], targetIndex: number): Board => {
	// Start with initial board
	let board = createInitialBoard();
	
	// Replay moves up to targetIndex (inclusive)
	for (let i = 0; i <= targetIndex && i < moveHistory.length; i++) {
		const move = moveHistory[i];
		board = makeMove(board, move.gamePiece.row, move.gamePiece.col, move.player.color);
	}
	
	return board;
};
