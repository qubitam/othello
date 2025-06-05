// Compact Header with emojis - minimal space

import React from 'react';
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
}

const Header: React.FC<HeaderProps> = ({ 
  currentPlayer, 
  score, 
  playerCredits,
  winner, 
  gameOver,
  validMovesCount,
  gameMode,
  onGetHint
}) => {
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

  const canUseHint = (): boolean => {
    if (gameOver || validMovesCount === 0) return false;
    
    const currentPlayerCredits = currentPlayer.color === 'black' 
      ? playerCredits.black 
      : playerCredits.white;
    
    // Check if it's a human player turn and they have enough credits
    if (gameMode === 'human_vs_human') {
      return currentPlayerCredits >= 20;
    } else if (gameMode === 'human_vs_ai') {
      // Only black (human) can use hints
      return currentPlayer.color === 'black' && currentPlayerCredits >= 20;
    }
    
    return false; // AI vs AI - no hints
  };

	// Note ** AI Helped in making this component **

  return (
    <div className="flex flex-col items-center">
      {/* Compact Header Card */}
      <div className="w-[33rem] md:w-[42rem] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg">
        {/* Current Status - Very Compact */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-2">
            <div className="text-4xl">
              {currentPlayer.color === 'black' ? '⚫' : '⚪'}
            </div>
            <h2 className="text-xl font-bold text-white capitalize">
              {getStatusMessage()}
            </h2>
          </div>
          
          {!gameOver && validMovesCount > 0 && (
            <p className="text-purple-200/70 text-sm mt-0.5">
              {validMovesCount} moves available
            </p>
          )}

          {/* Hint Button */}
          {canUseHint() && (
            <div className="mt-2">
                <button
                  onClick={onGetHint}
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/40 text-yellow-300 px-2 py-1 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 animate-bounce"
                >
                  💡 Get Hint (-20 💰)
                </button>
            </div>
          )}
        </div>

        {/* Compact Players Score Display */}
        <div className="flex items-center justify-center gap-3">
          {/* Black Player */}
          <div className={`
            flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all duration-300 flex-1
            ${currentPlayer.color === 'black' && !gameOver 
              ? 'bg-white/20 ring-1 ring-white/30' 
              : 'bg-white/5'
            }
            ${winner === 'black' ? 'bg-yellow-500/20 ring-1 ring-yellow-400' : ''}
          `}>
            <div className="text-3xl">⚫</div>
            <div className="flex-1">
              <div className="text-xl font-bold text-white">{score.black}</div>
              <div className="text-base font-medium text-gray-300">Black</div>
              <div className="text-xs text-purple-300">💰 {playerCredits.black} credits</div>
            </div>
            {currentPlayer.color === 'black' && !gameOver && (
              <div className="text-green-400 text-xs">●</div>
            )}
            {winner === 'black' && (
              <div className="text-yellow-400 text-2xl">👑</div>
            )}
          </div>

          {/* VS Separator */}
          <div className="text-xs font-bold text-white/40 px-1">VS</div>

          {/* White Player */}
          <div className={`
            flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all duration-300 flex-1
            ${currentPlayer.color === 'white' && !gameOver 
              ? 'bg-white/20 ring-1 ring-white/30' 
              : 'bg-white/5'
            }
            ${winner === 'white' ? 'bg-yellow-500/20 ring-1 ring-yellow-400' : ''}
          `}>
            <div className="text-3xl">⚪</div>
            <div className="flex-1">
              <div className="text-xl font-bold text-white">{score.white}</div>
              <div className="text-base font-medium text-gray-300">White</div>
              <div className="text-xs text-purple-300">💰 {playerCredits.white} credits</div>
            </div>
            {currentPlayer.color === 'white' && !gameOver && (
              <div className="text-green-400 text-xs">●</div>
            )}
            {winner === 'white' && (
              <div className="text-yellow-400 text-2xl">👑</div>
            )}
          </div>
        </div>

        {/* Compact Game Over Message */}
        {gameOver && (
          <div className="mt-2 text-center">
            <p className="text-yellow-300 text-xs font-semibold">
              Final: Black {score.black} - White {score.white}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;