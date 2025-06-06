import React from 'react';
import type { Player, Position, Board as BoardType, Move } from '../types';
import { playCellSound, getBoardAtHistoryIndex } from '../utils/gameLogic';
import { useAppSelector } from '../hooks/redux';

interface BoardProps {
	board: BoardType;
	validMoves: Position[];
	onCellClick: (row: number, col: number) => void;
	currentPlayer: Player;
	gameMode: string;
	isAIThinking: boolean;
	hintPosition: Position | null;
}

const Board: React.FC<BoardProps> = ({ board, validMoves, onCellClick, currentPlayer, gameMode, isAIThinking, hintPosition }) => {
	// Get history navigation state
	const { moveHistory, historyViewIndex, isViewingHistory } = useAppSelector(state => state.game);
	
	// Determine which board to display
	const displayBoard = isViewingHistory && historyViewIndex >= 0 
		? getBoardAtHistoryIndex(moveHistory, historyViewIndex)
		: board;
	
  const isValidMove = (row: number, col: number) => {
    if (isViewingHistory) return false; // No valid moves shown in history view
    return validMoves.some((move) => move.row === row && move.col === col);
  }

  const isHintPosition = (row: number, col: number) => {
    if (isViewingHistory) return false; // No hints shown in history view
    return hintPosition && hintPosition.row === row && hintPosition.col === col;
  }

  const shouldDisableClicks = () => {
    return isAIThinking || (gameMode === 'ai_vs_ai') || isViewingHistory;
  }

  const handleCellClick = (row: number, col: number) => {
    if (shouldDisableClicks()) return;
    
    playCellSound();
    onCellClick(row, col);
  }

	return (
		<div>
			<div className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 p-4 rounded-3xl shadow-2xl border-2 border-emerald-500/20 backdrop-blur-sm md:min-w-[42rem] max-w-[42rem] md:min-h-[42rem] max-h-[42rem] w-auto h-auto">
				<div className="grid grid-cols-8 grid-rows-8 gap-4">
					{displayBoard.flatMap((row, rowIndex) => 
						row.map((piece, colIndex) => (
							<div 
								key={`${rowIndex}-${colIndex}`} 
								className={`w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 
									border border-emerald-500/30 rounded-lg 
									flex items-center justify-center relative 
									transition-all duration-200
									${shouldDisableClicks() ? 'cursor-not-allowed' : 'cursor-pointer hover:from-amber-500 hover:to-amber-600 hover:scale-105'}
									${isValidMove(rowIndex, colIndex) 
										? 'from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/50 animate-[pulse_4s_ease-in-out]' 
										: ''
									}
									${isHintPosition(rowIndex, colIndex)
										? 'from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 shadow-lg shadow-yellow-500/50 ring-2 ring-yellow-300'
										: ''
									}`}
								onClick={() => handleCellClick(rowIndex, colIndex)}
							>
								{piece.color !== 'empty' && (
									<div 
										className={`
											w-8 h-8 md:w-12 md:h-12 rounded-full border-2 shadow-xl
											transition-all duration-500 animate-[fadeIn_0.5s_ease-out]
											hover:scale-110
											${piece.color === 'black' 
												? 'bg-gradient-to-br from-gray-600 via-gray-800 to-black border-gray-700 shadow-black/50' 
												: 'bg-gradient-to-br from-white via-gray-100 to-gray-200 border-gray-400 shadow-white/30'
											}
										`}
									/>
								)}
								
								{isValidMove(rowIndex, colIndex) && (
									<div className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 animate-[bounce_1.6s_ease-in-out_infinite] shadow-lg ${
										currentPlayer.color === 'black' 
											? 'bg-black/80 border-black' 
											: 'bg-white/80 border-white'
									}`} />
								)}

								{isHintPosition(rowIndex, colIndex) && (
									<div className="absolute -top-3 -right-1 bg-yellow-400 text-black text-[10px] md:text-xs font-bold px-1 py-0.5 rounded-full shadow-lg">
										BEST
									</div>
								)}
							</div>
						))
					)}
				</div>
			</div>
			
			{/* History viewing indicator - moved outside and below the board */}
			{isViewingHistory && (
				<div className="mt-4 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-400/50 rounded-lg text-blue-200 text-sm font-medium">
						📖 Viewing History - Move {historyViewIndex + 1}
					</div>
				</div>
			)}
		</div>
	)
}
export default Board;