interface TopNavigationProps {
	getGameModeDisplay: () => string;
	handleNewGameClick: () => void;
	handleReset: () => void;
	handleMoveHistoryClick: () => void;
}
  
const TopNavigation: React.FC<TopNavigationProps> = ({ 
    getGameModeDisplay, 
    handleNewGameClick, 
    handleReset,
	handleMoveHistoryClick
}) => {
	return (
		<div className="flex justify-between items-center mb-6 max-w-[42rem] mx-auto">
			<div className=" items-center gap-4">
				<h1 className="text-2xl font-bold italic text-white">Othello</h1>
				<div className="px-3 py-1 bg-white/10 rounded-lg text-xs text-purple-200 font-semibold mt-1">
					{getGameModeDisplay()}
				</div>
			</div>
			<div className="flex gap-3">
				<button
					onClick={handleNewGameClick}
					className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
				>
					🏠 New Game
				</button>
				<button
					onClick={handleMoveHistoryClick}
					className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-medium transition-colors flex items-center gap-2"
				>
					📋 History
              </button>
				<button
					onClick={handleReset}
					className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition-colors"
				>
					🔄
				</button>

			</div>
		</div>
	)
}
  
export default TopNavigation;