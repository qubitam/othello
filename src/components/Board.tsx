import React from 'react';
import type { Player } from '../types';

interface BoardProps {
	board: Player[][];
}
const Board: React.FC<BoardProps> = ({ board }) => {
    
	return (
		<div className="bg-gradient-to-br from-emerald-800 to-emerald-900 p-4 rounded-3xl shadow-2xl border border-emerald-600/30">
			<div className="grid grid-cols-8 gap-x-6 gap-y-6">
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((cell, colIndex) => (
							<div key={colIndex} className="w-16 h-16 rounded-lg flex items-center justify-center">
								<div className="p-2 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 0">
									<div className="w-10 h-10 rounded-lg flex items-center justify-center text-4xl">
										{cell === 'black' ? '⚫' : cell === 'white' ? '⚪' : ''}
									</div>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
export default Board;