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
		<div className="flex justify-between items-center mb-6 w-full px-4 md:px-0 md:max-w-[42rem] mx-auto">
			<div className="flex flex-col md:flex-col items-start md:items-center gap-1">
				<h2 className="text-5xl font-bold italic text-white">Othello</h2>
				<div className="px-3 md:px-3 py-1 bg-white/10 rounded-lg text-[10px] md:text-xs text-purple-200 font-semibold">
					{getGameModeDisplay()}
				</div>
			</div>
			<div className="flex gap-2 md:gap-3">
				<button
					onClick={handleNewGameClick}
					className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-600 hover:bg-green-700 rounded-lg text-md font-semibold transition-colors"
				>
					<span className="hidden md:inline">🏠 Main Menu</span>
					<span className="md:hidden">🏠</span>
				</button>
				<button
					onClick={handleMoveHistoryClick}
					className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 md:px-3 py-1.5 md:py-2 text-white text-md font-medium transition-colors flex items-center gap-1 md:gap-2"
				>
					<span className="hidden md:inline">📋 History</span>
					<span className="md:hidden">📋</span>
				</button>
				<button
					onClick={handleReset}
					className="flex items-center justify-center w-8 md:w-auto px-3 md:px-4 py-1.5 md:py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-base font-semibold transition-colors"
				>
					🔄
				</button>
			</div>
		</div>
	)
}
  
export default TopNavigation;