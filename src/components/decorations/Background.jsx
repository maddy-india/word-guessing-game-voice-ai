import { Clouds } from './Cloud';
import { Sun } from './Sun';
import { Grass } from './Grass';

export function Background({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-blue to-sky-blue-light relative overflow-hidden">
      {/* Sky decorations */}
      <Clouds />
      <Sun className="w-24 h-24 top-4 right-8 md:w-28 md:h-28 md:top-6 md:right-12" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>

      {/* Ground decorations */}
      <Grass />
    </div>
  );
}
