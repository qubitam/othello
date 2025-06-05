import type { AI_DIFFICULTY } from '../types';

// Game configuration constants
export const INITIAL_SCORE = {
  BLACK: 2,
  WHITE: 2,
} as const;

// Game modes
export const GAME_MODES = {
  HUMAN_VS_HUMAN: 'human_vs_human',
  HUMAN_VS_AI: 'human_vs_ai',
} as const;

// Simple piece color constants
export const PIECE_COLORS = {
  BLACK: 'black',
  WHITE: 'white',
  EMPTY: 'empty',
} as const;

// AI difficulty levels - properly typed
export const AI_DIFFICULTIES: Record<string, AI_DIFFICULTY> = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const; 