import { createContext, useContext, useReducer, useCallback } from 'react';
import { GAME_STATUS, DEFAULT_TIMER, DEFAULT_ROUNDS } from '../utils/constants';

// Initial state
const initialState = {
  gameId: null,
  players: [
    { id: 'player1', name: 'Player 1', score: 0 },
    { id: 'player2', name: 'Player 2', score: 0 },
  ],
  currentTurn: 0, // Index of current player (0 or 1)
  turnInRound: 0, // Which turn within the round (0 = player1's turn, 1 = player2's turn)
  usedWords: new Set(),
  wordHistory: [], // { word, playerId, isValid, timestamp, reason, points }
  timerDuration: DEFAULT_TIMER,
  timeRemaining: DEFAULT_TIMER,
  gameStatus: GAME_STATUS.SETUP,
  winner: null, // 'player1', 'player2', or 'tie'
  lastWord: null,
  currentWord: '', // Word being spoken/displayed
  validationResult: null, // { isValid, reason, message, points }
  // Round settings: 1 round = each player gets 1 turn
  // Scoring: +1 for valid word, +0.5 bonus for answering within 5 seconds
  // Game continues until all rounds complete
  totalRounds: DEFAULT_ROUNDS, // 0 = unlimited (sudden death)
  currentRound: 1,
  autoListen: true, // Auto-start listening on turn change
};

// Action types
const ACTIONS = {
  SET_PLAYER_NAME: 'SET_PLAYER_NAME',
  SET_TIMER_DURATION: 'SET_TIMER_DURATION',
  SET_TOTAL_ROUNDS: 'SET_TOTAL_ROUNDS',
  SET_AUTO_LISTEN: 'SET_AUTO_LISTEN',
  START_GAME: 'START_GAME',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  TIMER_TICK: 'TIMER_TICK',
  TIMER_EXPIRED: 'TIMER_EXPIRED',
  SET_CURRENT_WORD: 'SET_CURRENT_WORD',
  SUBMIT_WORD: 'SUBMIT_WORD',
  WORD_VALIDATED: 'WORD_VALIDATED',
  NEXT_TURN: 'NEXT_TURN',
  END_ROUND: 'END_ROUND',
  END_GAME: 'END_GAME',
  RESTART_GAME: 'RESTART_GAME',
  CLEAR_VALIDATION: 'CLEAR_VALIDATION',
};

// Helper to determine game winner based on scores
function determineWinner(players) {
  const [p1, p2] = players;
  if (p1.score > p2.score) return p1.id;
  if (p2.score > p1.score) return p2.id;
  return 'tie';
}

// Reducer
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PLAYER_NAME: {
      const newPlayers = [...state.players];
      newPlayers[action.payload.playerIndex] = {
        ...newPlayers[action.payload.playerIndex],
        name: action.payload.name,
      };
      return { ...state, players: newPlayers };
    }

    case ACTIONS.SET_TIMER_DURATION:
      return {
        ...state,
        timerDuration: action.payload,
        timeRemaining: action.payload,
      };

    case ACTIONS.SET_TOTAL_ROUNDS:
      return { ...state, totalRounds: action.payload };

    case ACTIONS.SET_AUTO_LISTEN:
      return { ...state, autoListen: action.payload };

    case ACTIONS.START_GAME: {
      const newPlayers = state.players.map((p) => ({ ...p, score: 0 }));
      return {
        ...state,
        gameId: Date.now().toString(),
        gameStatus: GAME_STATUS.PLAYING,
        players: newPlayers,
        currentTurn: 0,
        turnInRound: 0,
        currentRound: 1,
        timeRemaining: state.timerDuration,
        usedWords: new Set(),
        wordHistory: [],
        winner: null,
        lastWord: null,
        currentWord: '',
        validationResult: null,
      };
    }

    case ACTIONS.PAUSE_GAME:
      return { ...state, gameStatus: GAME_STATUS.PAUSED };

    case ACTIONS.RESUME_GAME:
      return { ...state, gameStatus: GAME_STATUS.PLAYING };

    case ACTIONS.TIMER_TICK:
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };

    case ACTIONS.TIMER_EXPIRED: {
      // In unlimited mode (totalRounds = 0), timer expiry ends the game
      if (state.totalRounds === 0) {
        const loserIndex = state.currentTurn;
        const winnerIndex = loserIndex === 0 ? 1 : 0;
        return {
          ...state,
          gameStatus: GAME_STATUS.FINISHED,
          winner: state.players[winnerIndex].id,
        };
      }

      // In round mode, just move to next turn (no points for timeout - player just misses their turn)
      // Check if this was player 2's turn (round complete) or player 1's turn
      const isRoundComplete = state.turnInRound === 1;
      const nextRound = isRoundComplete ? state.currentRound + 1 : state.currentRound;
      const gameOver = isRoundComplete && nextRound > state.totalRounds;

      if (gameOver) {
        return {
          ...state,
          gameStatus: GAME_STATUS.FINISHED,
          winner: determineWinner(state.players),
        };
      }

      // Continue: either next turn in round or start new round
      // Word chain NEVER resets - continues for entire game
      return {
        ...state,
        currentRound: nextRound,
        currentTurn: isRoundComplete ? 0 : 1,
        turnInRound: isRoundComplete ? 0 : 1,
        timeRemaining: state.timerDuration,
        currentWord: '',
        validationResult: null,
        // Keep usedWords and lastWord - chain continues!
      };
    }

    case ACTIONS.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload };

    case ACTIONS.WORD_VALIDATED: {
      const { word, isValid, reason, message, timeRemaining } = action.payload;
      const currentPlayer = state.players[state.currentTurn];

      // Calculate points:
      // - 100 points if answered within 5 seconds
      // - After 5 seconds: lose 1 point per second (minimum 45 points at 55+ seconds)
      let points = 0;
      if (isValid) {
        const timeUsed = state.timerDuration - (timeRemaining || 0);
        if (timeUsed <= 5) {
          points = 100; // Max points for fast answer
        } else {
          // Reduce by 1 point per second after 5 seconds
          // timeUsed = 6 -> 99, timeUsed = 55 -> 50, timeUsed >= 55 -> 45
          const secondsOver = timeUsed - 5;
          points = Math.max(45, 100 - secondsOver);
        }
      }

      const newWordHistory = [
        ...state.wordHistory,
        {
          word,
          playerId: currentPlayer.id,
          isValid,
          timestamp: Date.now(),
          reason,
          points,
        },
      ];

      const newUsedWords = new Set(state.usedWords);
      if (isValid) {
        newUsedWords.add(word.toLowerCase());
      }

      // Update player score if valid
      const newPlayers = [...state.players];
      if (isValid) {
        newPlayers[state.currentTurn] = {
          ...newPlayers[state.currentTurn],
          score: newPlayers[state.currentTurn].score + points,
        };
      }

      return {
        ...state,
        players: newPlayers,
        wordHistory: newWordHistory,
        usedWords: newUsedWords,
        validationResult: { isValid, reason, message, points },
        lastWord: isValid ? word : state.lastWord,
      };
    }

    case ACTIONS.NEXT_TURN: {
      // Move to next turn
      const nextTurnInRound = state.turnInRound + 1;
      const isRoundComplete = nextTurnInRound >= 2; // Both players have gone
      const nextRound = isRoundComplete ? state.currentRound + 1 : state.currentRound;

      // Check if game should end (all rounds complete)
      if (state.totalRounds > 0 && isRoundComplete && nextRound > state.totalRounds) {
        return {
          ...state,
          gameStatus: GAME_STATUS.FINISHED,
          winner: determineWinner(state.players),
        };
      }

      // Word chain NEVER resets - continues for entire game
      return {
        ...state,
        currentTurn: isRoundComplete ? 0 : 1,
        turnInRound: isRoundComplete ? 0 : 1,
        currentRound: nextRound,
        timeRemaining: state.timerDuration,
        currentWord: '',
        validationResult: null,
        // Keep usedWords and lastWord - chain continues!
      };
    }

    case ACTIONS.END_ROUND: {
      // Called when a player makes an invalid word in round mode
      // Award point to the other player
      const winnerIndex = state.currentTurn === 0 ? 1 : 0;
      const newPlayers = [...state.players];
      newPlayers[winnerIndex] = {
        ...newPlayers[winnerIndex],
        score: newPlayers[winnerIndex].score + 1,
      };

      // Check if this was player 2's turn (round complete) or player 1's turn
      const isRoundComplete = state.turnInRound === 1;
      const nextRound = isRoundComplete ? state.currentRound + 1 : state.currentRound;
      const gameOver = state.totalRounds > 0 && isRoundComplete && nextRound > state.totalRounds;

      if (gameOver) {
        return {
          ...state,
          players: newPlayers,
          gameStatus: GAME_STATUS.FINISHED,
          winner: determineWinner(newPlayers),
        };
      }

      // Continue: either next turn in round or start new round
      // Word chain NEVER resets - continues for entire game
      return {
        ...state,
        players: newPlayers,
        currentRound: nextRound,
        currentTurn: isRoundComplete ? 0 : 1,
        turnInRound: isRoundComplete ? 0 : 1,
        timeRemaining: state.timerDuration,
        currentWord: '',
        validationResult: null,
        // Keep usedWords and lastWord - chain continues!
      };
    }

    case ACTIONS.END_GAME: {
      // For unlimited mode - immediate game over
      if (state.totalRounds === 0) {
        const loserIndex = state.currentTurn;
        const winnerIndex = loserIndex === 0 ? 1 : 0;
        return {
          ...state,
          gameStatus: GAME_STATUS.FINISHED,
          winner: state.players[winnerIndex].id,
        };
      }

      // For round mode, this shouldn't be called directly
      // Use END_ROUND instead
      return state;
    }

    case ACTIONS.RESTART_GAME:
      return {
        ...initialState,
        players: state.players.map((p) => ({ ...p, score: 0 })),
        timerDuration: state.timerDuration,
        timeRemaining: state.timerDuration,
        totalRounds: state.totalRounds,
        autoListen: state.autoListen,
      };

    case ACTIONS.CLEAR_VALIDATION:
      return { ...state, validationResult: null };

    default:
      return state;
  }
}

// Context
const GameContext = createContext(null);

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Action creators
  const setPlayerName = useCallback((playerIndex, name) => {
    dispatch({ type: ACTIONS.SET_PLAYER_NAME, payload: { playerIndex, name } });
  }, []);

  const setTimerDuration = useCallback((duration) => {
    dispatch({ type: ACTIONS.SET_TIMER_DURATION, payload: duration });
  }, []);

  const setTotalRounds = useCallback((rounds) => {
    dispatch({ type: ACTIONS.SET_TOTAL_ROUNDS, payload: rounds });
  }, []);

  const setAutoListen = useCallback((enabled) => {
    dispatch({ type: ACTIONS.SET_AUTO_LISTEN, payload: enabled });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: ACTIONS.START_GAME });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE_GAME });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME_GAME });
  }, []);

  const timerTick = useCallback(() => {
    dispatch({ type: ACTIONS.TIMER_TICK });
  }, []);

  const timerExpired = useCallback(() => {
    dispatch({ type: ACTIONS.TIMER_EXPIRED });
  }, []);

  const setCurrentWord = useCallback((word) => {
    dispatch({ type: ACTIONS.SET_CURRENT_WORD, payload: word });
  }, []);

  const wordValidated = useCallback((result) => {
    dispatch({ type: ACTIONS.WORD_VALIDATED, payload: result });
  }, []);

  const nextTurn = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_TURN });
  }, []);

  const endRound = useCallback(() => {
    dispatch({ type: ACTIONS.END_ROUND });
  }, []);

  const endGame = useCallback(() => {
    dispatch({ type: ACTIONS.END_GAME });
  }, []);

  const restartGame = useCallback(() => {
    dispatch({ type: ACTIONS.RESTART_GAME });
  }, []);

  const clearValidation = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_VALIDATION });
  }, []);

  const value = {
    ...state,
    setPlayerName,
    setTimerDuration,
    setTotalRounds,
    setAutoListen,
    startGame,
    pauseGame,
    resumeGame,
    timerTick,
    timerExpired,
    setCurrentWord,
    wordValidated,
    nextTurn,
    endRound,
    endGame,
    restartGame,
    clearValidation,
    // Computed values
    currentPlayer: state.players[state.currentTurn],
    otherPlayer: state.players[state.currentTurn === 0 ? 1 : 0],
    isPlaying: state.gameStatus === GAME_STATUS.PLAYING,
    isPaused: state.gameStatus === GAME_STATUS.PAUSED,
    isFinished: state.gameStatus === GAME_STATUS.FINISHED,
    isSetup: state.gameStatus === GAME_STATUS.SETUP,
    winnerPlayer: state.winner === 'tie'
      ? null
      : state.players.find((p) => p.id === state.winner),
    isTie: state.winner === 'tie',
    requiredStartLetter: state.lastWord
      ? state.lastWord.slice(-1).toLowerCase()
      : null,
    isUnlimitedMode: state.totalRounds === 0,
    // Round info: which turn in the current round (1 or 2)
    turnNumberInRound: state.turnInRound + 1,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Custom hook
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
