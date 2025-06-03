import './App.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { resetGame } from './stores/gameSlice'

import Board from './components/Board'
import Header from './components/Header'
const GameContainer = () => {
	const { board, currentPlayer } = useAppSelector((state) => state.game);


  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Header currentPlayer={currentPlayer} />
      <Board board={board} />
      <button onClick={() => dispatch(resetGame())}>Reset</button>
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
