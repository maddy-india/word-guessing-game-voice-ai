import { TurnIndicator } from './TurnIndicator';
import { Timer } from './Timer';
import { WordDisplay } from './WordDisplay';
import { VoiceInput } from './VoiceInput';
import { GameControls } from './GameControls';
import { GameOverModal } from './GameOverModal';
import { PauseModal } from './PauseModal';
import { Card } from '../ui/Card';

export function GameBoard() {
  return (
    <div className="flex-1 flex flex-col p-4 pb-32">
      {/* Top section: Players with scores and word lists */}
      <div className="mb-4">
        <TurnIndicator />
      </div>

      {/* Main game area */}
      <Card className="flex-1 flex flex-col items-center justify-center gap-6 max-w-3xl mx-auto w-full animate-bounce-in">
        {/* Timer */}
        <Timer />

        {/* Word display */}
        <WordDisplay />

        {/* Voice input */}
        <VoiceInput />

        {/* Game controls */}
        <GameControls />
      </Card>

      {/* Modals */}
      <GameOverModal />
      <PauseModal />
    </div>
  );
}
