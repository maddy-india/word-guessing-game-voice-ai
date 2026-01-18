import { useGame } from '../../context/GameContext';
import { PigAvatar } from '../ui/PigAvatar';
import { PLAYER_COLORS } from '../../utils/constants';
import { Star, Check, X } from 'lucide-react';

export function TurnIndicator() {
  const {
    players,
    currentTurn,
    validationResult,
    isPlaying,
    totalRounds,
    currentRound,
    isUnlimitedMode,
    wordHistory,
    turnNumberInRound,
  } = useGame();

  // Determine expression based on game state
  const getExpression = (playerIndex) => {
    if (!isPlaying) return 'happy';
    if (playerIndex !== currentTurn) return 'thinking';
    if (validationResult?.isValid) return 'excited';
    if (validationResult?.isValid === false) return 'sad';
    return 'happy';
  };

  // Get words for a specific player
  const getPlayerWords = (playerId) => {
    return wordHistory.filter((w) => w.playerId === playerId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Round indicator */}
      {!isUnlimitedMode && (
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="font-peppa text-lg text-daddy-blue bg-white/80 px-4 py-1 rounded-full">
            Round {currentRound} of {totalRounds}
          </span>
          <span className="font-body text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-full">
            Turn {turnNumberInRound}/2
          </span>
        </div>
      )}

      {/* Stacked player cards */}
      <div className="flex flex-col gap-3">
        {players.map((player, index) => {
          const isActive = index === currentTurn && isPlaying;
          const playerNum = index + 1;
          const color = PLAYER_COLORS[playerNum];
          const playerWords = getPlayerWords(player.id);
          const validWords = playerWords.filter((w) => w.isValid);

          return (
            <div
              key={player.id}
              className={`
                relative flex items-center gap-4 p-3 md:p-4 rounded-2xl
                transition-all duration-300
                ${isActive
                  ? 'bg-white shadow-lg border-4 animate-pulse-slow'
                  : 'bg-white/70 border-2 border-transparent'
                }
              `}
              style={{
                borderColor: isActive ? color.primary : 'transparent',
                boxShadow: isActive
                  ? `0 0 20px ${color.primary}40, 0 4px 12px rgba(0,0,0,0.1)`
                  : undefined,
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute -left-3 top-1/2 -translate-y-1/2 text-2xl animate-bounce"
                  style={{ color: color.primary }}
                >
                  ▶
                </div>
              )}

              {/* Avatar */}
              <div className={`relative flex-shrink-0 ${isActive ? 'animate-float' : ''}`}>
                <PigAvatar
                  color={color.primary}
                  size={isActive ? 60 : 50}
                  expression={getExpression(index)}
                />

                {/* Speaking indicator */}
                {isActive && (
                  <div
                    className="absolute -right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs animate-pulse"
                    style={{ backgroundColor: color.primary }}
                  >
                    🎤
                  </div>
                )}
              </div>

              {/* Player info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {/* Name */}
                  <span
                    className={`
                      font-peppa truncate
                      ${isActive ? 'text-lg' : 'text-base text-gray-600'}
                    `}
                    style={{ color: isActive ? color.dark : undefined }}
                  >
                    {player.name}
                  </span>

                  {/* Turn label */}
                  {isActive && (
                    <span
                      className="text-xs font-body px-2 py-0.5 rounded-full text-white animate-pulse flex-shrink-0"
                      style={{ backgroundColor: color.primary }}
                    >
                      Your Turn!
                    </span>
                  )}
                </div>

                {/* Word list */}
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                  {playerWords.length === 0 ? (
                    <span className="text-xs text-gray-400 italic">No words yet</span>
                  ) : (
                    playerWords.map((entry, wordIndex) => (
                      <span
                        key={`${entry.word}-${entry.timestamp}`}
                        className={`
                          inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-body
                          ${entry.isValid
                            ? 'bg-white border'
                            : 'bg-error-red/10 border border-error-red/30 line-through opacity-60'
                          }
                        `}
                        style={{
                          borderColor: entry.isValid ? `${color.primary}50` : undefined,
                        }}
                        title={entry.isValid ? `+${entry.points} pts${entry.points === 100 ? ' (speed bonus!)' : ''}` : entry.reason}
                      >
                        {entry.word}
                        {entry.isValid ? (
                          <>
                            <span className="text-[10px] text-gray-500">+{entry.points}</span>
                            {entry.points === 100 && (
                              <span className="text-[10px] text-sunshine-yellow font-bold">⚡</span>
                            )}
                          </>
                        ) : (
                          <X className="w-2.5 h-2.5 text-error-red" />
                        )}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Score */}
              <div
                className="flex flex-col items-center justify-center px-3 py-2 rounded-xl flex-shrink-0"
                style={{ backgroundColor: `${color.primary}15` }}
              >
                <div className="flex items-center gap-1">
                  <Star
                    className="w-4 h-4"
                    style={{ color: color.primary, fill: color.primary }}
                  />
                  <span
                    className="text-2xl font-peppa"
                    style={{ color: color.dark }}
                  >
                    {player.score}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  points
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
