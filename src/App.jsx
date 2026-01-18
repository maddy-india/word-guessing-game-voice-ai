import { useGame } from './context/GameContext';
import { Background } from './components/decorations/Background';
import { GameSetup } from './components/setup/GameSetup';
import { GameBoard } from './components/game/GameBoard';

function AppContent() {
  const { isSetup } = useGame();

  return (
    <Background>
      {isSetup ? <GameSetup /> : <GameBoard />}
    </Background>
  );
}

export default function App() {
  return <AppContent />;
}
