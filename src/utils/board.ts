import { BOARD_SIZE, type Player } from '../types';

export const createEmptyBoard = (): Player[][] => {
	return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill('empty'));
}

export const createInitialBoard = (): Player[][] => {
	const board = createEmptyBoard();
	board[3][3] = 'white';
	board[3][4] = 'black';
	board[4][3] = 'black';
	board[4][4] = 'white';
	return board;
}