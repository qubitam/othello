import React from 'react';
import type { Player, Position } from '../types';

// BoardProps is the props for the Board component
interface BoardProps {
	board: Player[][];
	validMoves: Position[];
	onCellClick: (row: number, col: number) => void;
	currentPlayer: Player;
	gameMode: string;
	isAIThinking: boolean;
}

// Board component
const Board: React.FC<BoardProps> = ({ board, validMoves, onCellClick, currentPlayer, gameMode, isAIThinking }) => {
	
	// Check if a cell is a valid move
  const isValidMove = (row: number, col: number) => {
    return validMoves.some((move) => move.row === row && move.col === col);
  }

  // Check if clicks should be disabled (AI turn)
  const shouldDisableClicks = () => {
    if (isAIThinking) return true;
    
    // Disable clicks when it's AI's turn
    if (gameMode === 'human_vs_ai' && currentPlayer === 'white') return true;
    if (gameMode === 'ai_vs_ai') return true;
    
    return false;
  }

  // Handle cell click with AI turn check
  const handleCellClick = (row: number, col: number) => {
    if (shouldDisableClicks()) return;
    onCellClick(row, col);
  }

	return (
		<div className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 p-4 rounded-3xl shadow-2xl border-2 border-emerald-500/20 backdrop-blur-sm md:min-w-[42rem] max-w-[42rem] md:min-h-[42rem] max-h-[42rem]">
			<div className="grid grid-cols-8 grid-rows-8 gap-4">
				{board.flatMap((row, rowIndex) => 
					row.map((cell, colIndex) => (
						<div 
							key={`${rowIndex}-${colIndex}`} 
							className={`w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 
								border border-emerald-500/30 rounded-lg 
								flex items-center justify-center relative 
								transition-all duration-200
								${shouldDisableClicks() ? 'cursor-not-allowed' : 'cursor-pointer hover:from-amber-500 hover:to-amber-600 hover:scale-105'}
								${isValidMove(rowIndex, colIndex) 
									? 'from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/50 animate-pulse' 
									: ''
								}`}
							onClick={() => handleCellClick(rowIndex, colIndex)}
						>
							{cell !== 'empty' && (
								<div 
									className={`
										w-12 h-12 rounded-full border-2 shadow-xl
										transition-all duration-500 animate-[fadeIn_0.5s_ease-out]
										hover:scale-110
										${cell === 'black' 
											? 'bg-gradient-to-br from-gray-600 via-gray-800 to-black border-gray-700 shadow-black/50' 
											: 'bg-gradient-to-br from-white via-gray-100 to-gray-200 border-gray-400 shadow-white/30'
										}
									`}
								/>
							)}
							
							{isValidMove(rowIndex, colIndex) && (
								<div className={`w-6 h-6 rounded-full border-2 animate-bounce shadow-lg ${
									currentPlayer === 'black' 
										? 'bg-black/80 border-black' 
										: 'bg-white/80 border-white'
								}`} />
							)}
						</div>
					))
				)}
			</div>
		</div>
	)
}
export default Board;