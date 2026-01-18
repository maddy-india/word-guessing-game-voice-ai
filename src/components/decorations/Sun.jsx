export function Sun({ className = '' }) {
  return (
    <div className={`absolute ${className}`}>
      {/* Sun rays - rotating */}
      <div className="absolute inset-0 animate-spin-slow">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-8 bg-sunshine-yellow rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '50% 50%',
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-50px)`,
            }}
          />
        ))}
      </div>

      {/* Sun circle */}
      <div className="absolute inset-4 bg-sunshine-yellow rounded-full shadow-lg">
        {/* Happy face */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Eyes */}
          <div className="absolute w-2 h-3 bg-amber-600 rounded-full" style={{ top: '35%', left: '30%' }} />
          <div className="absolute w-2 h-3 bg-amber-600 rounded-full" style={{ top: '35%', right: '30%' }} />
          {/* Smile */}
          <div
            className="absolute w-8 h-4 border-b-4 border-amber-600 rounded-b-full"
            style={{ top: '50%', left: '50%', transform: 'translateX(-50%)' }}
          />
        </div>
      </div>
    </div>
  );
}
