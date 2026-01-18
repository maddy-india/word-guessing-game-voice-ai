import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TIMER_OPTIONS, ROUND_OPTIONS, PLAYER_COLORS } from '../../utils/constants';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { PigAvatar } from '../ui/PigAvatar';
import { Mic, MicOff } from 'lucide-react';

export function GameSetup() {
  const {
    players,
    timerDuration,
    totalRounds,
    autoListen,
    setPlayerName,
    setTimerDuration,
    setTotalRounds,
    setAutoListen,
    startGame,
  } = useGame();

  const [errors, setErrors] = useState({ player1: '', player2: '' });

  const handleNameChange = (index, value) => {
    setPlayerName(index, value);
    if (errors[`player${index + 1}`]) {
      setErrors((prev) => ({ ...prev, [`player${index + 1}`]: '' }));
    }
  };

  const handleStart = () => {
    const newErrors = { player1: '', player2: '' };

    if (!players[0].name.trim()) {
      newErrors.player1 = 'Please enter a name';
    }
    if (!players[1].name.trim()) {
      newErrors.player2 = 'Please enter a name';
    }

    if (newErrors.player1 || newErrors.player2) {
      setErrors(newErrors);
      return;
    }

    startGame();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 pb-32">
      <Card className="w-full max-w-lg animate-bounce-in">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-peppa text-center text-peppa-pink mb-2">
          Word Chain Game
        </h1>
        <p className="text-center text-sm text-gray-500 font-body mb-8">
          Made by Athena with <span className="text-error-red">&#10084;</span>
        </p>

        {/* Player inputs */}
        <div className="space-y-6 mb-6">
          {/* Player 1 */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 animate-float" style={{ animationDelay: '0s' }}>
              <PigAvatar
                color={PLAYER_COLORS[1].primary}
                size={60}
                expression="happy"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Player 1"
                placeholder="Enter name..."
                value={players[0].name}
                onChange={(e) => handleNameChange(0, e.target.value)}
                error={errors.player1}
                maxLength={15}
              />
            </div>
          </div>

          {/* Player 2 */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 animate-float" style={{ animationDelay: '0.5s' }}>
              <PigAvatar
                color={PLAYER_COLORS[2].primary}
                size={60}
                expression="happy"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Player 2"
                placeholder="Enter name..."
                value={players[1].name}
                onChange={(e) => handleNameChange(1, e.target.value)}
                error={errors.player2}
                maxLength={15}
              />
            </div>
          </div>
        </div>

        {/* Game settings */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Time per turn"
            options={TIMER_OPTIONS}
            value={timerDuration}
            onChange={(e) => setTimerDuration(Number(e.target.value))}
          />
          <Select
            label="Number of rounds"
            options={ROUND_OPTIONS}
            value={totalRounds}
            onChange={(e) => setTotalRounds(Number(e.target.value))}
          />
        </div>

        {/* Auto-listen toggle */}
        <div className="mb-6">
          <button
            onClick={() => setAutoListen(!autoListen)}
            className={`
              w-full flex items-center justify-between
              px-4 py-3 rounded-2xl
              border-4 transition-all duration-200
              ${autoListen
                ? 'bg-success-green/20 border-success-green'
                : 'bg-gray-100 border-gray-300'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {autoListen ? (
                <Mic className="w-6 h-6 text-success-green" />
              ) : (
                <MicOff className="w-6 h-6 text-gray-400" />
              )}
              <div className="text-left">
                <p className="font-body font-semibold text-gray-700">
                  Auto-listen
                </p>
                <p className="text-sm text-gray-500">
                  {autoListen
                    ? 'Microphone starts automatically each turn'
                    : 'Tap microphone to start speaking'}
                </p>
              </div>
            </div>
            <div
              className={`
                w-12 h-7 rounded-full p-1 transition-all duration-200
                ${autoListen ? 'bg-success-green' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
                  ${autoListen ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </div>
          </button>
        </div>

        {/* Start button */}
        <Button
          variant="primary"
          size="xl"
          className="w-full"
          onClick={handleStart}
        >
          Start Game!
        </Button>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-sky-blue/30 rounded-2xl">
          <h3 className="font-peppa text-lg text-daddy-blue mb-2">
            How to Play
          </h3>
          <ul className="font-body text-sm text-gray-600 space-y-1">
            <li>Say a word that starts with the last letter of the previous word</li>
            <li>Example: apple → elephant → tiger</li>
            <li>No repeated words allowed!</li>
            <li>
              {totalRounds === 0
                ? 'Sudden death: First mistake loses!'
                : `Win rounds by making your opponent fail. Best of ${totalRounds}!`}
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
