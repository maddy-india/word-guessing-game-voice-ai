import { useEffect, useCallback, useState, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useGame } from '../../context/GameContext';
import { validateWord } from '../../services/wordValidator';
import { Button } from '../ui/Button';

export function VoiceInput() {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    clearError,
  } = useVoiceRecognition();

  const {
    isPlaying,
    isPaused,
    lastWord,
    usedWords,
    setCurrentWord,
    wordValidated,
    nextTurn,
    endGame,
    autoListen,
    currentTurn,
    currentRound,
    isUnlimitedMode,
    timeRemaining,
  } = useGame();

  const [isValidating, setIsValidating] = useState(false);
  const prevTurnRef = useRef({ turn: currentTurn, round: currentRound });

  // Auto-listen when turn changes (if enabled)
  useEffect(() => {
    const turnChanged =
      prevTurnRef.current.turn !== currentTurn ||
      prevTurnRef.current.round !== currentRound;

    if (turnChanged && autoListen && isPlaying && !isPaused && !isValidating && isSupported) {
      // Small delay to let UI update
      const timer = setTimeout(() => {
        clearError();
        resetTranscript();
        setCurrentWord('');
        startListening();
      }, 500);

      prevTurnRef.current = { turn: currentTurn, round: currentRound };
      return () => clearTimeout(timer);
    }

    prevTurnRef.current = { turn: currentTurn, round: currentRound };
  }, [currentTurn, currentRound, autoListen, isPlaying, isPaused, isValidating, isSupported, clearError, resetTranscript, setCurrentWord, startListening]);

  // Update current word display in real-time
  useEffect(() => {
    const displayText = transcript || interimTranscript;
    if (displayText) {
      // Get first word only
      const firstWord = displayText.trim().split(/\s+/)[0];
      setCurrentWord(firstWord);
    }
  }, [transcript, interimTranscript, setCurrentWord]);

  // Handle word submission when we get a final transcript
  const handleWordSubmission = useCallback(async () => {
    if (!transcript || isValidating) return;

    const word = transcript.trim().split(/\s+/)[0];
    if (!word) return;

    // Capture time remaining NOW (before API call)
    const timeRemainingAtSubmission = timeRemaining;

    setIsValidating(true);

    try {
      const result = await validateWord(word, lastWord, usedWords);

      wordValidated({
        word,
        isValid: result.isValid,
        reason: result.reason,
        message: result.message,
        timeRemaining: timeRemainingAtSubmission, // Use captured time, not current
      });

      // Wait for animation, then proceed
      setTimeout(() => {
        // In unlimited mode, invalid word ends the game
        if (!result.isValid && isUnlimitedMode) {
          endGame();
        } else {
          // In round mode, always proceed to next turn (valid or invalid)
          resetTranscript();
          nextTurn();
        }
        setIsValidating(false);
      }, 1500);
    } catch (err) {
      console.error('Validation error:', err);
      setIsValidating(false);
    }
  }, [transcript, lastWord, usedWords, wordValidated, nextTurn, endGame, resetTranscript, isValidating, isUnlimitedMode, timeRemaining]);

  // Auto-submit when we get a final transcript
  useEffect(() => {
    if (transcript && !isListening && !isValidating) {
      handleWordSubmission();
    }
  }, [transcript, isListening, handleWordSubmission, isValidating]);

  const handleMicClick = () => {
    if (!isPlaying || isPaused || isValidating) return;

    if (isListening) {
      stopListening();
    } else {
      clearError();
      resetTranscript();
      setCurrentWord('');
      startListening();
    }
  };

  // Not supported message
  if (!isSupported) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-warning-yellow/20 rounded-2xl">
        <AlertCircle className="w-12 h-12 text-mummy-orange" />
        <p className="font-body text-center text-gray-700">
          Voice recognition is not supported in your browser.
          <br />
          Please use Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Microphone button */}
      <div className="relative">
        {/* Ripple effect when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-peppa-pink animate-ripple" />
            <div className="absolute inset-0 rounded-full bg-peppa-pink animate-ripple" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-0 rounded-full bg-peppa-pink animate-ripple" style={{ animationDelay: '0.6s' }} />
          </>
        )}

        <Button
          variant={isListening ? 'primary' : 'icon'}
          size="icon-lg"
          className={`
            relative z-10
            w-20 h-20 md:w-24 md:h-24
            ${isListening ? 'bg-error-red hover:bg-error-red/90 border-error-red' : ''}
            ${isValidating ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={handleMicClick}
          disabled={!isPlaying || isPaused || isValidating}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 md:w-10 md:h-10 text-white" />
          ) : (
            <Mic className="w-8 h-8 md:w-10 md:h-10" />
          )}
        </Button>
      </div>

      {/* Status text */}
      <p className="font-body text-lg text-gray-600">
        {isValidating ? (
          <span className="text-daddy-blue">Checking word...</span>
        ) : isListening ? (
          <span className="text-error-red animate-pulse">
            Listening... Tap to stop
          </span>
        ) : autoListen ? (
          <span className="text-gray-400">Auto-listening enabled</span>
        ) : (
          'Tap to speak'
        )}
      </p>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2 bg-error-red/20 text-error-red rounded-xl">
          <AlertCircle className="w-5 h-5" />
          <span className="font-body text-sm">{error}</span>
        </div>
      )}

      {/* Interim transcript display (speech bubble) */}
      {isListening && interimTranscript && (
        <div className="relative bg-white border-2 border-muddy-brown rounded-2xl px-4 py-2 mt-2 animate-pop-in">
          {/* Speech bubble tail */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-muddy-brown transform rotate-45" />
          <p className="font-body text-lg text-gray-500 italic">
            {interimTranscript}...
          </p>
        </div>
      )}
    </div>
  );
}
