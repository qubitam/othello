import './App.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'

const GameContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Othello</h1>
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
