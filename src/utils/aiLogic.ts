import type { Board, Player, Position, AI_DIFFICULTY } from '../types';
import { getValidMoves } from './gameLogic';


export const getAIMove = (board: Board, player: Player, aiDifficulty: AI_DIFFICULTY): Position | null => {
	const validMoves = getValidMoves(board, player);

	if (validMoves.length === 0) return null;
	console.log(aiDifficulty);
	switch (aiDifficulty) {
		case 'easy':
			return validMoves[Math.floor(Math.random() * validMoves.length)];
		case 'medium':
			return validMoves[Math.floor(Math.random() * validMoves.length)];
		case 'hard':
			return validMoves[Math.floor(Math.random() * validMoves.length)];
	}
}
