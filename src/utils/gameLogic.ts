import type { Board, Player } from '../types';
import { BOARD_SIZE } from '../types';

// Get opposite player
export const getOpponent = (player: Player): Player => {
	return player === 'black' ? 'white' : 'black';
};

// Check if a move is on the board
export const isOnBoard = (row: number, col: number): boolean => {
	return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

// Note ** AI Helped in making this function **
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
	player: Player
): { row: number; col: number }[] => {
	const opponent = getOpponent(player);
	const toFlip = [];

	// Start from the next position
	let r = row + direction[0];
	let c = col + direction[1];

	// Check if the move is on the board    
	while (isOnBoard(r, c) && board[r][c] === opponent) {
		toFlip.push({row: r, col: c});
		r += direction[0];
		c += direction[1];
	}

	// If the move is on the board and the cell is the player's color, return the cells to flip
	if (isOnBoard(r, c) && board[r][c] === player && toFlip.length > 0) {
		return toFlip;
	}

	// If the move is not on the board or the cell is not the player's color, return an empty array
	return [];
}


// Get all valid moves
export const getValidMoves = (
	board: Board, player: Player
) => {
	const validMoves = [];

	for (let row = 0; row < BOARD_SIZE; row++) {
		for (let col = 0; col < BOARD_SIZE; col++) {
			if (isValidMove(board, row, col, player)) {
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
	player: Player
): boolean => {

	// Check if the cell is empty
	if (board[row][col] !== 'empty') return false;
	
	// Check all directions
	return directions.some((direction) => {
		return checkDirection(board, row, col, direction, player).length > 0;
	});
}


// Make a move
export const makeMove = (
	board: Board, row: number, col: number, player: Player
): Board => {
	const newBoard = board.map(row => [...row]);

	newBoard[row][col] = player;

	// Flip pieces
	for (const direction of directions) {
		const toFlip = checkDirection(board, row, col, direction, player);
		for (const {row, col} of toFlip) {
			newBoard[row][col] = player;
		}
	}

	return newBoard;
}

// Get the winner
export const getWinner = (board: Board): Player | null => {
	const blackCount = board.flat().filter(cell => cell === 'black').length;
	const whiteCount = board.flat().filter(cell => cell === 'white').length;

	if (blackCount > whiteCount) return 'black';
	if (whiteCount > blackCount) return 'white';

	return null;
}