import './App.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { startNewGame, resetGame, makeGameMove, showMainMenu } from './stores/gameSlice'
import { useAI } from './hooks/useAI'
import type { AI_DIFFICULTY } from './types'
import Board from './components/Board'
import Header from './components/Header'
import TopNavigation from './components/TopNavigation'
import MainMenu from './components/MainMenu'
const GameContainer = () => {
	const { 
    board, 
    currentPlayer, 
    validMoves, 
    score, 
    winner,
    gameOver,
    gameMode,
    gameStarted,
    isAIThinking
  } = useAppSelector((state) => state.game);
	const dispatch = useAppDispatch();

  // AI Hook
  useAI();

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    dispatch(makeGameMove({ row, col }));
  }

  // Handle start game
  const handleStartGame = (selectedMode: string, selectedAIDifficulty?: AI_DIFFICULTY) => {
    dispatch(startNewGame({ mode: selectedMode, aiDifficulty: selectedAIDifficulty }));
  }

  // Handle going back to main menu
  // Maybe make a better confirmation dialog
  const handleNewGameClick = () => {
    window.confirm('Are you sure you want to start a new game?') && dispatch(showMainMenu());
  };

  // Handle reset game
  const handleReset = () => {
    dispatch(resetGame());
  }
  
  // Get game mode display for top navigation
  const getGameModeDisplay = () => {
    switch(gameMode) {
      case 'human_vs_human': return '👥 Human vs Human';
      case 'human_vs_ai': return '🧠 Human vs AI';
      case 'ai_vs_ai': return '🤖 AI vs AI';
      default: return 'Unknown';
    }
  };

  // Render main menu if game is not started
  if (!gameStarted) {
    return (
      <MainMenu 
        onStartGame={handleStartGame}
      />
    )
  }

  // Render game if game is started
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white min-w-screen flex items-center justify-center">
      <div className="max-w-screen-lg mx-auto space-y-6">
        {/* Top navigation */}
				<TopNavigation 
					getGameModeDisplay={getGameModeDisplay}
					handleNewGameClick={handleNewGameClick}
					handleReset={handleReset}
				/>
        {/* Header */}
        <div className="flex flex-col items-center justify-center">
          <Header currentPlayer={currentPlayer} score={score} winner={winner} gameOver={gameOver} validMovesCount={validMoves.length} />
        </div>
        {/* Board */}
        <div className="flex flex-col items-center justify-center">
          <Board 
            board={board} 
            validMoves={validMoves}  
            onCellClick={handleCellClick} 
            currentPlayer={currentPlayer}
            gameMode={gameMode}
            isAIThinking={isAIThinking}
          /> 
        </div>
      </div>
    </div>
  )
}

// Main App component
function App() {

  return (
   <Provider store={store}>
    <GameContainer />
   </Provider>
  )
}

export default App
