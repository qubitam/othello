import './App.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { startNewGame, resetGame, makeGameMove, showMainMenu } from './stores/gameSlice'

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
    gameStarted
  } = useAppSelector((state) => state.game);

  
	const dispatch = useAppDispatch();

  const handleCellClick = (row: number, col: number) => {
    dispatch(makeGameMove({ row, col }));
  }

  const handleStartGame = (gameMode: string) => {
    dispatch(startNewGame(gameMode));
  }

  const getGameModeDisplay = () => {
    switch (gameMode) {
      case 'human_vs_human':
        return 'Human vs Human';
      case 'human_vs_ai':
        return 'Human vs AI';
      case 'ai_vs_ai':
        return 'AI vs AI';
      default:
        return 'Human vs Human';
    }
  }

  if (!gameStarted) {
    return (
      <MainMenu 
        onStartGame={handleStartGame}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white min-w-screen flex items-center justify-center">
      <div className="max-w-screen-lg mx-auto space-y-6">
				<TopNavigation 
					getGameModeDisplay={getGameModeDisplay}
					handleNewGameClick={() => dispatch(startNewGame(gameMode))}
					handleReset={() => dispatch(resetGame())}
				/>
        <div className="flex flex-col items-center justify-center">
          <Header currentPlayer={currentPlayer} score={score} winner={winner} gameOver={gameOver} validMovesCount={validMoves.length} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Board 
            board={board} 
            validMoves={validMoves}  
            onCellClick={handleCellClick} 
            currentPlayer={currentPlayer} 
          /> 
        </div>
      </div>
    </div>
  )
}
  
function App() {

  return (
   <Provider store={store}>
    <GameContainer />
   </Provider>
  )
}

export default App
