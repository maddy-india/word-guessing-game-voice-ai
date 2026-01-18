import { useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { PLAYER_COLORS } from '../../utils/constants';
import { Check, X } from 'lucide-react';

export function WordHistory() {
  const { wordHistory, players } = useGame();
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new words are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [wordHistory]);

  if (wordHistory.length === 0) {
    return (
      <div className="bg-white/50 rounded-2xl p-4 text-center">
        <p className="font-body text-gray-400">
          Words will appear here as you play!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/50 rounded-2xl p-4">
      <h3 className="font-peppa text-lg text-daddy-blue mb-3">Word History</h3>

      <div
        ref={scrollRef}
        className="flex flex-wrap gap-2 max-h-32 overflow-y-auto"
      >
        {wordHistory.map((entry, index) => {
          const playerIndex = players.findIndex((p) => p.id === entry.playerId);
          const playerNum = playerIndex + 1;
          const color = PLAYER_COLORS[playerNum];

          return (
            <div
              key={`${entry.word}-${entry.timestamp}`}
              className={`
                inline-flex items-center gap-1
                px-3 py-1.5
                bg-white
                border-2 rounded-full
                font-body
                animate-pop-in
                ${entry.isValid ? '' : 'opacity-60 line-through'}
              `}
              style={{
                borderColor: color?.primary || '#888',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Player indicator dot */}
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color?.primary || '#888' }}
              />

              {/* Word */}
              <span className="text-sm">{entry.word}</span>

              {/* Valid/Invalid icon */}
              {entry.isValid ? (
                <Check className="w-3 h-3 text-success-green" />
              ) : (
                <X className="w-3 h-3 text-error-red" />
              )}
            </div>
          );
        })}
      </div>

      {/* Word count */}
      <div className="mt-2 text-xs font-body text-gray-400 text-center">
        {wordHistory.filter((w) => w.isValid).length} valid words played
      </div>
    </div>
  );
}
