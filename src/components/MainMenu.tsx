// Main Menu Screen - Game-style main menu

import React, { useState } from 'react';

interface MainMenuProps {
  onStartGame: (gameMode: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const [selectedMode, setSelectedMode] = useState<string>('human_vs_human');

  const gameModes = [
    {
      id: 'human_vs_human',
      title: 'Human vs Human',
      description: 'Play with a friend locally',
      icon: '👥'
    },
    {
      id: 'human_vs_ai',
      title: 'Human vs AI',
      description: 'Challenge the computer',
      icon: '🧠'
    },
    {
      id: 'ai_vs_ai',
      title: 'AI vs AI',
      description: 'Watch AI battle',
      icon: '🤖'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white flex items-center justify-center min-w-screen">
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        
        <div className="mb-12">
          <div className="text-8xl mb-6">⚫⚪</div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            OTHELLO
          </h1>
          <p className="text-purple-200/80 text-xl">Master the art of strategy</p>
        </div>

        {/* Game Mode Selection */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-8">Choose Game Mode</h2>
          
          <div className="space-y-4">
            {gameModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`
                  w-full p-6 rounded-2xl transition-all duration-300 text-left border-2
                  ${selectedMode === mode.id 
                    ? 'bg-white/20 border-white/40 scale-105 shadow-lg' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{mode.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {mode.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {mode.description}
                    </p>
                  </div>
                  {selectedMode === mode.id && (
                    <div className="text-green-400 text-2xl">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <div className="space-y-4">
          <button
            onClick={() => onStartGame(selectedMode)}
            className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-2xl font-bold text-2xl shadow-xl transition-all duration-200 hover:scale-105 transform"
          >
            <span className="mr-2">🎮</span> Start Game
          </button>
          
          <p className="text-purple-200/60 text-sm">
            Ready to flip some pieces?
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;