import { useGame } from '../../context/GameContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PigAvatar } from '../ui/PigAvatar';
import { Confetti } from '../decorations/Confetti';
import { PLAYER_COLORS } from '../../utils/constants';
import { Trophy, RotateCcw, Home, Star, Handshake } from 'lucide-react';

export function GameOverModal() {
  const {
    isFinished,
    winnerPlayer,
    isTie,
    wordHistory,
    restartGame,
    players,
    isUnlimitedMode,
    totalRounds,
  } = useGame();

  if (!isFinished) return null;

  const winnerIndex = players.findIndex((p) => p.id === winnerPlayer?.id);
  const winnerNum = winnerIndex + 1;
  const winnerColor = PLAYER_COLORS[winnerNum];

  const validWordCount = wordHistory.filter((w) => w.isValid).length;

  return (
    <>
      <Confetti isActive={isFinished && !isTie} />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 p-4">
        <Card className="w-full max-w-md animate-bounce-in text-center">
          {/* Trophy or Handshake (for tie) */}
          <div className="flex justify-center mb-4">
            {isTie ? (
              <div className="w-20 h-20 rounded-full flex items-center justify-center animate-float bg-sunshine-yellow/30">
                <Handshake size={40} className="text-mummy-orange" />
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center animate-float"
                style={{ backgroundColor: winnerColor?.light || '#FFE66D' }}
              >
                <Trophy
                  size={40}
                  style={{ color: winnerColor?.dark || '#DAA520' }}
                />
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-peppa text-peppa-pink mb-4">
            {isTie ? "It's a Tie!" : 'Game Over!'}
          </h2>

          {/* Winner/Tie display */}
          {isTie ? (
            // Tie - show both players
            <div className="flex justify-center items-center gap-4 mb-6">
              {players.map((player, index) => {
                const playerNum = index + 1;
                const color = PLAYER_COLORS[playerNum];
                return (
                  <div key={player.id} className="flex flex-col items-center">
                    <div className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                      <PigAvatar
                        color={color.primary}
                        size={70}
                        expression="happy"
                      />
                    </div>
                    <p className="font-peppa text-lg mt-2" style={{ color: color.dark }}>
                      {player.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-sunshine-yellow fill-current" />
                      <span className="font-body font-bold">{player.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Winner display
            <div className="flex flex-col items-center mb-6">
              <div className="mb-2 animate-float">
                <PigAvatar
                  color={winnerColor?.primary || '#FF6B9D'}
                  size={100}
                  expression="excited"
                />
              </div>
              <p
                className="text-2xl font-peppa"
                style={{ color: winnerColor?.dark || '#C74C74' }}
              >
                {winnerPlayer?.name || 'Player'} Wins!
              </p>
            </div>
          )}

          {/* Final scores (for round-based games) */}
          {!isUnlimitedMode && (
            <div className="bg-sky-blue/30 rounded-2xl p-4 mb-4">
              <h3 className="font-peppa text-lg text-daddy-blue mb-3">Final Scores</h3>
              <div className="flex justify-around">
                {players.map((player, index) => {
                  const playerNum = index + 1;
                  const color = PLAYER_COLORS[playerNum];
                  const isWinner = player.id === winnerPlayer?.id;
                  return (
                    <div
                      key={player.id}
                      className={`
                        flex flex-col items-center p-3 rounded-xl
                        ${isWinner && !isTie ? 'bg-white shadow-md' : ''}
                      `}
                    >
                      <span
                        className="font-body font-semibold truncate max-w-[80px]"
                        style={{ color: color.dark }}
                      >
                        {player.name}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-5 h-5" style={{ color: color.primary, fill: color.primary }} />
                        <span className="text-2xl font-peppa" style={{ color: color.dark }}>
                          {player.score}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        points
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gray-100 rounded-2xl p-3 mb-6">
            <p className="font-body text-sm text-gray-600">
              Total words played:{' '}
              <span className="font-bold text-daddy-blue">{validWordCount}</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={restartGame}
              className="flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Play Again
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={restartGame}
              className="flex items-center justify-center gap-2"
            >
              <Home size={20} />
              New Game
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
