# Othello Game - Technical Assignment

This is a simple Othello (Reversi) game built with React, TypeScript, and Redux Toolkit. Building this from scratch to demonstrate clean architecture and development practices.

**[🕹️ Live Version: Check it out](https://othello-delta.vercel.app/)**

### Installation & Running

1. Clone the repository
```bash
git clone https://github.com/qubitam/othello.git
cd othello
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## Project Goals

Building a complete Othello game to showcase:
- Modern React with TypeScript
- Redux state management
- Clean, maintainable code
- Professional UI/UX
- Extensible and scalable

## Tech Stack

- **React 19** + TypeScript
- **Redux Toolkit** for state
- **Tailwind CSS v4** for styling
- **Vite** for fast builds

## Development Plan

### Phase 1: Setup & Foundation
- [x] Project setup with Vite + React + TypeScript  
- [x] Tailwind CSS configuration
- [x] Basic types and folder structure
- [x] Redux store setup

### Phase 2: Basic Board
- [x] Create 8x8 visual game board
- [x] Board component with cells
- [x] Initial piece placement (4 center pieces)
- [x] Basic styling

### Phase 3: Game Logic  
- [x] Move validation (Othello rules)
- [x] Piece flipping algorithm
- [x] Valid move detection
- [x] Turn switching

### Phase 4: Player Interaction
- [x] Click handlers for moves
- [x] Visual feedback (valid moves highlighted)
- [x] Score tracking
- [x] Game over detection

### Phase 5: AI Implementation
- [x] Simple AI with difficulty levels
- [x] AI move selection algorithms
- [x] Human vs AI mode
- [x] AI vs AI mode

### Phase 6: Extra Features
- [x] Better animations and visual feedback
- [x] Sound effects for piece placement  
- [x] Interactive move history with time travel
- [x] Credits system (10 credits per move, 20 for hints)
- [x] AI thinking indicators
- [x] Hints system showing best moves
- [ ] Game statistics and player profiles
- [ ] Online multiplayer
- [ ] Time limits and turn timers
- [ ] Undo/Redo functionality  
- [ ] Piece flipping animations
- [ ] Mobile responsiveness (partially done)

### Advanced Features - Interactive Move History

**Time Travel Functionality**
- Click any move in history to see exact board state at that moment
- Navigation controls: Current Game, First Move, Previous, Next, Last Move  
- Board automatically reconstructs by replaying moves from initial position
- Visual indicator shows when viewing history vs current game
- Chess-style move notation (A1, B2, etc.) with timestamps

**Technical Implementation**
- Efficient state reconstruction - rebuilds board from move history instead of storing every state
- Clean separation between current game and history viewing modes
- Prevents moves while viewing history with proper state management

# My Implementation Analysis

## What I Did Well

### Clean Architecture & Code Organization
- Used proper TypeScript types throughout the project - created clear interfaces for GamePiece, Player, Position, and GameState  
- Separated concerns nicely with different folders: components/, utils/, stores/, types/, hooks/  
- Redux Toolkit implementation is clean and follows best practices with proper slice structure  
- Game logic is well separated from UI components  

### Game Logic Implementation
- Implemented proper Othello rules with direction checking for valid moves  
- Created reusable functions like checkDirection(), getValidMoves(), and makeMove()  
- Score calculation and winner detection works correctly  
- Move validation is solid and handles all edge cases  

### AI Implementation
- Three difficulty levels with different strategies:  
  - Easy: Random moves  
  - Medium: Most pieces flipped strategy  
  - Hard: Smart strategy with corner preference and avoiding dangerous X-squares  
- AI thinking state with visual feedback to users  
- Proper timing delays to make AI moves feel natural  


### User Experience Features
- Credits system that rewards players for moves (10 credits per move)  
- Hint system that costs 20 credits and shows best moves  
- Move history tracking with modal display  
- Sound effects for moves  
- Visual feedback for valid moves, hints, and AI thinking  
- Multiple game modes: Human vs Human, Human vs AI, AI vs AI  

### Modern Tech Stack
- React 19 with TypeScript for type safety  
- Redux Toolkit for predictable state management  
- Tailwind CSS v4 for modern styling  
- Vite for fast development and builds  

## Where I Found Difficulty & What Could Be Better

### Areas That Were Challenging
- Direction Array Logic: Initially had trouble with the 8-direction checking for valid moves. Had to get help to fix the direction array and make the checkDirection() function work properly  
- AI Strategy: Implementing the hard difficulty AI was tricky - needed assistance with corner detection and X-square avoidance logic  
- State Management Complexity: Managing all the different game states (AI thinking, hints, credits, move history) in Redux became complex  

### Things That Could Be Improved

#### Code Quality
- Some functions in gameSlice.ts are getting long - could break them into smaller pieces  
- Error handling could be better - no proper error states for invalid moves or AI failures  
- Could add more unit tests for game logic functions  

#### User Experience
- Mobile responsiveness is partially done 
- No undo/redo functionality  
- No timer for moves or turn limits  
- Confirmation dialogs are basic browser alerts - could be custom modals  

#### Performance
- AI calculations could be optimized for larger boards or deeper analysis  
- Board re-renders could be optimized with React.memo  
- Sound loading could be improved with preloading  

#### Features Missing
- Online multiplayer functionality  
- Save/load game state  
- Different board sizes  
- Tournament mode  
- Better animations and transitions  

## My Development Approach
I started with basic game board and pieces, then built the core Othello logic step by step. Used Redux for state management from the beginning which made adding features like AI, hints, and move history easier. When I got stuck on complex logic like direction checking or AI strategy, I got help to understand the algorithms better.  

The hardest part was making sure all the game rules worked correctly and handling all the different game states properly. Testing different scenarios manually took time but helped catch bugs early.  

I also added a credits and hints system to show how the game could be extended with monetizable features

Overall, I'm happy with the clean code structure and the features I managed to implement, but there's definitely room for improvement in performance, mobile support, and additional game features.

The move history with time travel was one of the cooler features to implement. Instead of storing every board state (which would use lots of memory), I decided to reconstruct board states by replaying moves from the beginning. This was much more efficient. The hardest part was managing the different viewing states and making sure users couldn't make moves while viewing history.


