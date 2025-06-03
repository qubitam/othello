import './App.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { resetGame, makeGameMove } from './stores/gameSlice'

import Board from './components/Board'
import Header from './components/Header'

const GameContainer = () => {
	const { board, currentPlayer, validMoves, score, winner, gameOver } = useAppSelector((state) => state.game);
  
	const dispatch = useAppDispatch();

  const handleCellClick = (row: number, col: number) => {
    dispatch(makeGameMove({ row, col }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white min-w-screen flex items-center justify-center">
      <div className="max-w-screen-lg mx-auto space-y-6">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-4xl font-bold italic">Othello</h2>
					<div className="flex flex-row items-center justify-center gap-2">
						<button 
							className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-4 py-2 rounded transition-all duration-200" 
							onClick={() => dispatch(resetGame())}
						>
							<span className="mr-2">🎮</span>  New Game
						</button>
						<button 
							className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded transition-all duration-200" 
							onClick={() => dispatch(resetGame())}
						>
							<span className="mr-2">🔄</span>  Reset
						</button>
					</div>
				</div>
        <div className="flex flex-col items-center justify-center">
          <Header currentPlayer={currentPlayer} />
        </div>
        <div className="flex flex-col items-center justify-center">
          	<Board board={board} validMoves={validMoves}  onCellClick={handleCellClick} currentPlayer={currentPlayer} /> 
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
