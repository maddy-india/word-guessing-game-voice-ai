import { useGame } from '../../context/GameContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Play, RotateCcw } from 'lucide-react';

export function PauseModal() {
  const { isPaused, resumeGame, restartGame } = useGame();

  if (!isPaused) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <Card className="w-full max-w-sm animate-bounce-in text-center">
        <h2 className="text-3xl font-peppa text-daddy-blue mb-6">
          Game Paused
        </h2>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={resumeGame}
            className="flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Resume
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={restartGame}
            className="flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Restart Game
          </Button>
        </div>
      </Card>
    </div>
  );
}
