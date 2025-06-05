import { BOARD_SIZE, type GamePiece } from '../types';

export const createEmptyBoard = (): GamePiece[][] => {
	return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill({ color: 'empty', row: 0, col: 0 }));
}

export const createInitialBoard = (): GamePiece[][] => {
	const board = createEmptyBoard();
	
	// Set up the initial 4 pieces in the center
	board[3][3] = { color: 'white', row: 3, col: 3 };
	board[3][4] = { color: 'black', row: 3, col: 4 };
	board[4][3] = { color: 'black', row: 4, col: 3 };
	board[4][4] = { color: 'white', row: 4, col: 4 };
	
	return board;
}