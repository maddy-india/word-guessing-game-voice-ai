import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PLAYER_COLORS } from '../../utils/constants';
import { Check, X } from 'lucide-react';

export function WordDisplay() {
  const {
    currentWord,
    lastWord,
    currentTurn,
    validationResult,
    requiredStartLetter,
  } = useGame();

  const [animationClass, setAnimationClass] = useState('');
  const playerColor = PLAYER_COLORS[currentTurn + 1];

  // Handle validation animations
  useEffect(() => {
    if (validationResult) {
      if (validationResult.isValid) {
        setAnimationClass('animate-bounce-in bg-success-green/20');
      } else {
        setAnimationClass('animate-shake bg-error-red/20');
      }

      const timer = setTimeout(() => {
        setAnimationClass('');
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [validationResult]);

  // Display text
  const displayWord = currentWord || (lastWord ? `...${requiredStartLetter?.toUpperCase()}` : 'Say a word!');

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hint for required letter */}
      {requiredStartLetter && !currentWord && (
        <div className="text-lg font-body text-gray-500">
          Word must start with{' '}
          <span
            className="font-peppa text-2xl px-2 py-1 rounded-lg"
            style={{ backgroundColor: `${playerColor.primary}30`, color: playerColor.dark }}
          >
            {requiredStartLetter.toUpperCase()}
          </span>
        </div>
      )}

      {/* Main word display */}
      <div
        className={`
          relative
          bg-white rounded-3xl
          border-4
          shadow-xl
          px-8 md:px-12 py-6 md:py-8
          min-w-[280px] md:min-w-[400px]
          text-center
          transition-all duration-300
          ${animationClass}
        `}
        style={{ borderColor: playerColor.primary }}
      >
        <p
          className={`
            text-4xl md:text-6xl font-peppa
            ${currentWord ? 'text-gray-800' : 'text-gray-400'}
          `}
        >
          {displayWord}
        </p>

        {/* Validation feedback icon */}
        {validationResult && (
          <div
            className={`
              absolute -right-4 -top-4
              w-12 h-12 rounded-full
              flex items-center justify-center
              text-white
              animate-pop-in
              ${validationResult.isValid ? 'bg-success-green' : 'bg-error-red'}
            `}
          >
            {validationResult.isValid ? (
              <Check size={28} strokeWidth={3} />
            ) : (
              <X size={28} strokeWidth={3} />
            )}
          </div>
        )}
      </div>

      {/* Validation message */}
      {validationResult && (
        <div
          className={`
            font-body text-lg font-semibold
            px-4 py-2 rounded-full
            animate-pop-in
            ${validationResult.isValid
              ? 'bg-success-green/20 text-success-green'
              : 'bg-error-red/20 text-error-red'
            }
          `}
        >
          {validationResult.isValid ? '✓' : '✗'} {validationResult.message}
        </div>
      )}
    </div>
  );
}
