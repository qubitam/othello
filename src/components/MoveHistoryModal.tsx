import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';

interface MoveHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// MoveHistoryModal is the modal that displays the move history
const MoveHistoryModal: React.FC<MoveHistoryModalProps> = ({ isOpen, onClose }) => {
  const moveHistory = useAppSelector(state => state.game.moveHistory);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Format the position of the move
  const formatPosition = (row: number, col: number): string => {
    const letters = 'ABCDEFGH';
    return `${letters[col]}${row + 1}`;
  };

  // Format the time of the move
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  if (!isOpen) return null;

  // AI helped with this UI
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 max-h-96 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Move History</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl leading-none hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {moveHistory.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No moves yet</p>
          ) : (
            <div className="space-y-2">
              {moveHistory.map((move, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between text-sm bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-300 font-bold min-w-[2rem]">{index + 1}.</span>
                    <span className="text-2xl">{move.player === 'black' ? '⚫' : '⚪'}</span>
                    <span className="text-white font-mono text-base">
                      {formatPosition(move.position.row, move.position.col)}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {formatTime(move.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-xs">Press ESC or click outside to close</p>
        </div>
      </div>
    </div>
  );
};

export default MoveHistoryModal; 