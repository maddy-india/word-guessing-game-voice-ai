import { useEffect, useState } from 'react';

const CONFETTI_COLORS = [
  '#FF6B9D', // Peppa Pink
  '#5BB1E8', // Daddy Blue
  '#FF8C42', // Mummy Orange
  '#FFE66D', // Sunshine Yellow
  '#7BC043', // Hill Green
  '#4A90E2', // George Blue
];

const SHAPES = ['circle', 'square', 'triangle'];

function ConfettiPiece({ delay, color, shape, left }) {
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    triangle: 'w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-l-transparent border-r-transparent',
  };

  const sizeClass = shape === 'triangle' ? '' : 'w-3 h-3';

  return (
    <div
      className={`absolute top-0 ${sizeClass} ${shape !== 'triangle' ? shapeStyles[shape] : ''} animate-confetti`}
      style={{
        left: `${left}%`,
        animationDelay: `${delay}ms`,
        backgroundColor: shape !== 'triangle' ? color : 'transparent',
        borderBottomColor: shape === 'triangle' ? color : undefined,
      }}
    />
  );
}

export function Confetti({ isActive }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (isActive) {
      const newPieces = [...Array(50)].map((_, i) => ({
        id: i,
        delay: Math.random() * 500,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        left: Math.random() * 100,
      }));
      setPieces(newPieces);
    } else {
      setPieces([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} {...piece} />
      ))}
    </div>
  );
}
