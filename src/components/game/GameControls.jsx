import { useGame } from '../../context/GameContext';
import { Button } from '../ui/Button';
import { Pause, Play, RotateCcw } from 'lucide-react';

export function GameControls() {
  const { isPaused, pauseGame, resumeGame, restartGame } = useGame();

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Pause/Resume */}
      <Button
        variant="secondary"
        size="icon"
        onClick={isPaused ? resumeGame : pauseGame}
        title={isPaused ? 'Resume' : 'Pause'}
      >
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </Button>

      {/* Restart */}
      <Button
        variant="ghost"
        size="icon"
        onClick={restartGame}
        title="Restart"
      >
        <RotateCcw size={20} />
      </Button>
    </div>
  );
}
