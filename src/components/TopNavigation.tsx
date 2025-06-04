interface TopNavigationProps {
	getGameModeDisplay: () => string;
	handleNewGameClick: () => void;
	handleReset: () => void;
}
  
const TopNavigation: React.FC<TopNavigationProps> = ({ 
    getGameModeDisplay, 
    handleNewGameClick, 
    handleReset 
}) => {
	return (
		<div className="flex justify-between items-center mb-6 max-w-[42rem] mx-auto">
			<div className="flex items-center gap-4">
				<h1 className="text-2xl font-bold italic text-white">Othello</h1>
				<div className="px-3 py-1 bg-white/10 rounded-lg text-xs text-purple-200 font-semibold mt-4">
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
					onClick={handleReset}
					className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition-colors"
				>
					🔄 Reset
				</button>
			</div>
		</div>
	)
}
  
export default TopNavigation;