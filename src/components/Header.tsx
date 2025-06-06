// Compact Header with emojis - minimal space

import React, { useState, useEffect } from 'react';
import type { Player, PieceColor } from '../types';

interface HeaderProps {
  currentPlayer: Player;
  score: { black: number; white: number };
  playerCredits: { black: number; white: number };
  winner: PieceColor | null;
  gameOver: boolean;
  validMovesCount: number;
  gameMode: string;
  hintPosition: { row: number; col: number } | null;
  onGetHint: () => void;
  isViewingHistory: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPlayer, 
  score, 
  playerCredits,
  winner, 
  gameOver,
  validMovesCount,
  gameMode,
  onGetHint,
  isViewingHistory
}) => {
  const [showWinningModal, setShowWinningModal] = useState(false);

  // Show modal when game is over
  useEffect(() => {
    if (gameOver) {
      setShowWinningModal(true);
    }
  }, [gameOver]);

  const getStatusMessage = (): string => {
    if (gameOver) {
      if (winner) {
        return `${winner} Wins! 🏆`;
      } else {
        return "Tie Game! 🤝";
      }
    }
    
    if (validMovesCount === 0) {
      return `${currentPlayer.color} - No moves`;
    }
    
    return `${currentPlayer.color}'s Turn`;
  };

  const shouldShowHintButton = (playerColor: PieceColor): boolean => {
    // Show hint button for human players
    if (gameMode === 'human_vs_human') {
      return true; // Both players are human
    } else if (gameMode === 'human_vs_ai') {
      return playerColor === 'black'; // Only black (human) gets hint button
    }
    
    return false; // AI vs AI - no hint buttons
  };

  const isHintButtonEnabled = (playerColor: PieceColor): boolean => {
    if (gameOver || validMovesCount === 0 || isViewingHistory) return false;
    
    const currentPlayerCredits = playerColor === 'black' 
      ? playerCredits.black 
      : playerCredits.white;
    
    return currentPlayer.color === playerColor && currentPlayerCredits >= 20;
  };

  const isAIPlayer = (playerColor: PieceColor): boolean => {
    if (gameMode === 'human_vs_human') return false;
    if (gameMode === 'human_vs_ai') return playerColor === 'white'; // White is AI
    if (gameMode === 'ai_vs_ai') return true; // Both are AI
    return false;
  };

  // Note ** AI Helped in making this component **
  
  return (
    <>
      {/* Game Over Modal */}
      {showWinningModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowWinningModal(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 border border-white/20 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">
              {winner ? (winner === 'black' ? '⚫' : '⚪') : '🤝'}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 capitalize">
              {getStatusMessage()}
            </h2>
            <div className="text-lg text-gray-300 mb-4">
              Final Score: Black {score.black} - White {score.white}
            </div>
            <button
              onClick={() => setShowWinningModal(false)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center w-full md:my-2 my-5">
        {/* Compact Header Card */}
        <div className="w-full max-w-[33rem] md:max-w-[42rem] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 md:p-3 shadow-lg">

          {/* Compact Players Score Display */}
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {/* Black Player */}
            <div className={`
              flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 rounded-xl transition-all duration-300 flex-1
              ${currentPlayer.color === 'black' && !gameOver 
                ? 'bg-white/20 ring-1 ring-white/30' 
                : 'bg-white/5'
              }
              ${winner === 'black' ? 'bg-yellow-500/20 ring-1 ring-yellow-400' : ''}
            `}>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <div className="text-lg md:text-xl font-bold text-white">{score.black}</div>
                  <div className="ml-2 text-sm md:text-lg font-medium text-gray-300">
                    Black {isAIPlayer('black') && '🧠'}
                  </div>
                </div>
                
                {/* Credits and Hint Button Inline */}
                <div className="flex items-center justify-between">
                  <div className="text-[10px] md:text-xs text-purple-300">💰 {playerCredits.black} credits</div>
                  {shouldShowHintButton('black') && (
                    <button
                      onClick={onGetHint}
                      disabled={!isHintButtonEnabled('black')}
                      className={`
                        px-2 py-1 rounded text-xs md:text-sm font-medium transition-all duration-200
                        ${isHintButtonEnabled('black')
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/40 text-yellow-300 hover:scale-105 cursor-pointer'
                          : 'bg-gray-500/10 border border-gray-500/20 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      💡 Get Hint
                    </button>
                  )}
                </div>
              </div>
              {winner === 'black' && (
                <div className="text-yellow-400 text-xl md:text-2xl">👑</div>
              )}
            </div>

            {/* VS Separator */}
            <div className="text-[10px] md:text-xs font-bold text-white/40 px-0.5 md:px-1">VS</div>

            {/* White Player */}
            <div className={`
              flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 rounded-xl transition-all duration-300 flex-1
              ${currentPlayer.color === 'white' && !gameOver 
                ? 'bg-white/20 ring-1 ring-white/30' 
                : 'bg-white/5'
              }
              ${winner === 'white' ? 'bg-yellow-500/20 ring-1 ring-yellow-400' : ''}
            `}>
              <div className="flex-1">
                <div className="flex items-center gap-">
                  <div className="text-lg md:text-xl font-bold text-white">{score.white}</div>
                  <div className="ml-2 text-sm md:text-lg font-medium text-gray-300">
                    White {isAIPlayer('white') && '🧠'}
                  </div>
                </div>
                
                {/* Credits and Hint Button Inline */}
                <div className="flex items-center justify-between">
                  <div className="text-[10px] md:text-xs text-purple-300">💰 {playerCredits.white} credits</div>
                  {shouldShowHintButton('white') && (
                    <button
                      onClick={onGetHint}
                      disabled={!isHintButtonEnabled('white')}
                      className={`
                        px-2 py-1 rounded text-xs md:text-sm font-medium transition-all duration-200
                        ${isHintButtonEnabled('white')
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/40 text-yellow-300 hover:scale-105 cursor-pointer'
                          : 'bg-gray-500/10 border border-gray-500/20 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      💡 Get Hint
                    </button>
                  )}
                </div>
              </div>
              {winner === 'white' && (
                <div className="text-yellow-400 text-xl md:text-2xl">👑</div>
              )}
            </div>
          </div>

          {/* Compact Game Over Message */}
          {gameOver ? (
            <div className="mt-1 md:mt-2 text-center">
              <p className="text-yellow-300 text-[10px] md:text-xs font-semibold">
                Final: Black {score.black} - White {score.white}
              </p>
            </div>
          ) : !gameOver && validMovesCount > 0 && (
            <div className="mt-1 md:mt-2 text-center">
              <p className="text-purple-200/70 text-xs md:text-sm mt-0.5">
                {validMovesCount} moves available
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;