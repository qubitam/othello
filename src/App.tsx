import './App.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { createInitialBoard } from './utils/board'

import Board from './components/Board'
import Header from './components/Header'
const GameContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Header />
      <Board board={createInitialBoard()} />
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
