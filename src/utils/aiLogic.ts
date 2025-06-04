import type { Board, Player, Position } from '../types';
import { getValidMoves } from './gameLogic';


export const getAIMove = (board: Board, player: Player): Position | null => {
	const validMoves = getValidMoves(board, player);

	if (validMoves.length === 0) return null;
	// Return a random move
	return validMoves[Math.floor(Math.random() * validMoves.length)];
}
