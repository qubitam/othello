import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { makeGameMove, setAIThinking } from '../stores/gameSlice';
import { getAIMove } from '../utils/aiLogic';
import { playCellSound } from '../utils/gameLogic';

export const useAI = (): void => {
  const dispatch = useAppDispatch();
  const { 
    board, 
    currentPlayer, 
    gameMode, 
    validMoves, 
    gameOver,
    gameStarted,
    isAIThinking,
    aiDifficulty
  } = useAppSelector(state => state.game);

	// In your useAI hook - add this timer back
	useEffect(() => {
    // Don't run AI if game is not started, game is over, or AI is already thinking
    if (!gameStarted || gameOver || isAIThinking) {
      return;
    }
  
    const shouldAIMove = 
      (gameMode === 'human_vs_ai' && currentPlayer.color === 'white') ||
      (gameMode === 'ai_vs_ai');
  
    if (shouldAIMove && validMoves.length > 0) {
      dispatch(setAIThinking(true));
      
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, currentPlayer, aiDifficulty);
        
        if (aiMove) {
          dispatch(makeGameMove({ row: aiMove.row, col: aiMove.col }));
          playCellSound();
        }
        
        dispatch(setAIThinking(false));
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameOver, gameStarted, validMoves]);
};