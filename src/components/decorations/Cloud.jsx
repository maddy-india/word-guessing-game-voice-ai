export function Cloud({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={`absolute ${className}`}
      style={style}
    >
      <ellipse cx="60" cy="60" rx="50" ry="35" fill="white" opacity="0.9" />
      <ellipse cx="100" cy="50" rx="45" ry="40" fill="white" opacity="0.9" />
      <ellipse cx="140" cy="60" rx="50" ry="35" fill="white" opacity="0.9" />
      <ellipse cx="80" cy="45" rx="35" ry="30" fill="white" opacity="0.95" />
      <ellipse cx="120" cy="45" rx="35" ry="30" fill="white" opacity="0.95" />
    </svg>
  );
}

export function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 - top left, slow drift */}
      <Cloud
        className="w-40 h-20 animate-drift-slow"
        style={{ top: '5%', left: '-200px', animationDelay: '0s' }}
      />

      {/* Cloud 2 - top right, reverse drift */}
      <Cloud
        className="w-32 h-16 animate-drift-slow-reverse"
        style={{ top: '10%', animationDelay: '-20s' }}
      />

      {/* Cloud 3 - middle, slow drift */}
      <Cloud
        className="w-36 h-18 animate-drift-slow"
        style={{ top: '15%', left: '-200px', animationDelay: '-40s' }}
      />

      {/* Cloud 4 - smaller, higher */}
      <Cloud
        className="w-24 h-12 animate-drift-slow-reverse opacity-80"
        style={{ top: '3%', animationDelay: '-10s' }}
      />
    </div>
  );
}
