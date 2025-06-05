import type { Board, Player, Position, AI_DIFFICULTY } from '../types';
import { getValidMoves, makeMove, calculateScores } from './gameLogic';

// Get the AI move based on the difficulty
export const getAIMove = (board: Board, player: Player, aiDifficulty: AI_DIFFICULTY): Position | null => {
	const validMoves = getValidMoves(board, player.color);

	if (validMoves.length === 0) return null;
	console.log(aiDifficulty);
	switch (aiDifficulty) {
		case 'easy':
			// Easy: Random move
			return validMoves[Math.floor(Math.random() * validMoves.length)];
		case 'medium':
			// Medium: Pick the move that flips the most pieces
			return getBestMoveByFlippedPieces(board, validMoves, player);
		case 'hard':
			// Hard: Smart strategy - corners first, then most flipped pieces
			return getSmartMove(board, validMoves, player);
	}
}

const countFlippedPieces = (board: Board, move: Position, player: Player): number => {
	// Use our makeMove function to simulate the move
	const newBoard = makeMove(board, move.row, move.col, player.color);
	
	// Count pieces before and after using our calculateScores function
	const originalScores = calculateScores(board);
	const newScores = calculateScores(newBoard);
	
	const playerKey = player.color as 'black' | 'white';
	const piecesGained = newScores[playerKey] - originalScores[playerKey];
	
	// Subtract 1 because we placed one piece, rest are flipped
	return piecesGained - 1;
};

// Find move that flips the most pieces (Medium difficulty)
const getBestMoveByFlippedPieces = (board: Board, validMoves: Position[], player: Player): Position => {
	let bestMove = validMoves[0];
	let mostFlipped = -1;
	
	for (const move of validMoves) {
		const flippedCount = countFlippedPieces(board, move, player);
		if (flippedCount > mostFlipped) {
			mostFlipped = flippedCount;
			bestMove = move;
		}
	}
	
	return bestMove;
};

// Smart move (Hard difficulty) - corners first, then most flipped
const getSmartMove = (board: Board, validMoves: Position[], player: Player): Position => {
	// 1. Always take corners if available (they can't be flipped back!)
	const corners = validMoves.filter(move => isCorner(move));
	if (corners.length > 0) {
		return corners[0];
	}
	
	// 2. Avoid dangerous X-squares (next to corners) if we have other options
	const saferMoves = validMoves.filter(move => !isXSquare(move));
	if (saferMoves.length > 0) {
		// From the safer moves, pick the one that flips the most pieces
		return getBestMoveByFlippedPieces(board, saferMoves, player);
	}
	
	// 3. If we only have X-squares, pick the best one
	return getBestMoveByFlippedPieces(board, validMoves, player);
};

// AI Helped with this
// Helper functions for position evaluation
const isCorner = (move: Position): boolean => {
	return (
		(move.row === 0 && move.col === 0) ||   // Top-left
		(move.row === 0 && move.col === 7) ||   // Top-right
		(move.row === 7 && move.col === 0) ||   // Bottom-left
		(move.row === 7 && move.col === 7)      // Bottom-right
	);
};

// AI Helped with this
const isXSquare = (move: Position): boolean => {
	// X-squares are diagonally adjacent to corners (dangerous!)
	return (
		(move.row === 1 && move.col === 1) ||   // Top-left X
		(move.row === 1 && move.col === 6) ||   // Top-right X
		(move.row === 6 && move.col === 1) ||   // Bottom-left X
		(move.row === 6 && move.col === 6)      // Bottom-right X
	);
};