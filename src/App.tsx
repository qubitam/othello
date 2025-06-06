import './App.css'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { startNewGame, resetGame, makeGameMove, showMainMenu, getHint, setHistoryView } from './stores/gameSlice'
import { useAI } from './hooks/useAI'
import type { AI_DIFFICULTY } from './types'
import Board from './components/Board'
import Header from './components/Header'
import TopNavigation from './components/TopNavigation'
import MainMenu from './components/MainMenu'
import MoveHistoryModal from './components/MoveHistoryModal'
const GameContainer = () => {
	const { 
    board, 
    currentPlayer, 
    validMoves, 
    score, 
    playerCredits,
    hintPosition,
    winner,
    gameOver,
    gameMode,
    gameStarted,
    isAIThinking,
    moveHistory,
    historyViewIndex,
    isViewingHistory
  } = useAppSelector((state) => state.game);
	const dispatch = useAppDispatch();

  // AI Hook
  useAI();

  // Handle move history modal
  const [isMoveHistoryModalOpen, setIsMoveHistoryModalOpen] = useState(false);

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
    if (window.confirm('Are you sure you want to start a new game?')) {
      dispatch(showMainMenu());
    }
  };

  // Handle reset game
  const handleReset = () => {
    dispatch(resetGame());
  }

  // Handle get hint
  const handleGetHint = () => {
    dispatch(getHint());
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white min-w-screen flex items-center justify-center px-3 md:px-0">
      <div className="max-w-screen-lg mx-auto space-y-3">
        {/* Top navigation */}
				<TopNavigation 
					getGameModeDisplay={getGameModeDisplay}
					handleNewGameClick={handleNewGameClick}
					handleReset={handleReset}
					handleMoveHistoryClick={() => setIsMoveHistoryModalOpen(true)}
				/>
        {/* Header */}
        <div className="flex flex-col items-center justify-center">
          <Header 
            currentPlayer={currentPlayer} 
            score={score} 
            playerCredits={playerCredits}
            winner={winner} 
            gameOver={gameOver} 
            validMovesCount={validMoves.length} 
            gameMode={gameMode}
            hintPosition={hintPosition}
            onGetHint={handleGetHint}
            isViewingHistory={isViewingHistory}
          />
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
            hintPosition={hintPosition}
          /> 
          <MoveHistoryModal 
            isOpen={isMoveHistoryModalOpen}
            onClose={() => setIsMoveHistoryModalOpen(false)}
            moveHistory={moveHistory}
            currentHistoryIndex={historyViewIndex}
            onHistoryNavigate={(index) => dispatch(setHistoryView({ index }))}
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
