// Game status constants
export const GAME_STATUS = {
  SETUP: 'setup',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
};

// Timer options in seconds
export const TIMER_OPTIONS = [
  { label: '10 seconds', value: 10 },
  { label: '15 seconds', value: 15 },
  { label: '30 seconds', value: 30 },
  { label: '60 seconds', value: 60 },
];

// Default timer duration
export const DEFAULT_TIMER = 30;

// Round options
export const ROUND_OPTIONS = [
  { label: '3 rounds', value: 3 },
  { label: '5 rounds', value: 5 },
  { label: '7 rounds', value: 7 },
  { label: '10 rounds', value: 10 },
  { label: 'Unlimited', value: 0 },
];

// Default rounds (0 = unlimited/sudden death)
export const DEFAULT_ROUNDS = 5;

// Validation result types
export const VALIDATION_RESULT = {
  VALID: 'valid',
  INVALID_EMPTY: 'invalid_empty',
  INVALID_NOT_WORD: 'invalid_not_word',
  INVALID_CHAIN_RULE: 'invalid_chain_rule',
  INVALID_USED: 'invalid_used',
  INVALID_PROPER_NOUN: 'invalid_proper_noun',
  INVALID_NUMBER: 'invalid_number',
};

// Friendly error messages
export const VALIDATION_MESSAGES = {
  [VALIDATION_RESULT.VALID]: 'Great word!',
  [VALIDATION_RESULT.INVALID_EMPTY]: 'Say a word!',
  [VALIDATION_RESULT.INVALID_NOT_WORD]: 'Not a real word!',
  [VALIDATION_RESULT.INVALID_CHAIN_RULE]: (letter) => `Must start with "${letter.toUpperCase()}"!`,
  [VALIDATION_RESULT.INVALID_USED]: 'Word already used!',
  [VALIDATION_RESULT.INVALID_PROPER_NOUN]: 'No names allowed!',
  [VALIDATION_RESULT.INVALID_NUMBER]: 'No numbers allowed!',
};

// Timer warning thresholds (in seconds)
export const TIMER_WARNING = 10;
export const TIMER_CRITICAL = 5;

// API endpoints
export const API = {
  DATAMUSE: 'https://api.datamuse.com/words',
  DICTIONARY: 'https://api.dictionaryapi.dev/api/v2/entries/en',
};

// Common proper nouns to filter (names, places)
export const COMMON_PROPER_NOUNS = new Set([
  'john', 'mary', 'james', 'michael', 'david', 'sarah', 'jennifer', 'jessica',
  'london', 'paris', 'tokyo', 'america', 'europe', 'africa', 'asia',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december',
  'christmas', 'easter', 'halloween',
  'google', 'apple', 'microsoft', 'facebook', 'amazon',
  'peppa', 'george', 'disney', 'pokemon', 'minecraft',
]);

// Player colors
export const PLAYER_COLORS = {
  1: {
    primary: '#5BB1E8', // Daddy Blue
    dark: '#3A8BC9',
    light: '#A3D5F3',
  },
  2: {
    primary: '#FF8C42', // Mummy Orange
    dark: '#E67320',
    light: '#FFBE99',
  },
};
