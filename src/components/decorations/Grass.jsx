export function Grass() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      {/* Hills in background */}
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-16 w-full"
        preserveAspectRatio="none"
      >
        <ellipse cx="200" cy="200" rx="300" ry="120" fill="#7BC043" opacity="0.7" />
        <ellipse cx="700" cy="200" rx="400" ry="150" fill="#7BC043" opacity="0.8" />
        <ellipse cx="1200" cy="200" rx="350" ry="130" fill="#7BC043" opacity="0.7" />
      </svg>

      {/* Main grass */}
      <svg
        viewBox="0 0 1440 120"
        className="absolute bottom-0 w-full h-24"
        preserveAspectRatio="none"
      >
        {/* Wavy grass top */}
        <path
          d="M0 40 Q 60 20, 120 40 T 240 40 T 360 40 T 480 40 T 600 40 T 720 40 T 840 40 T 960 40 T 1080 40 T 1200 40 T 1320 40 T 1440 40 V 120 H 0 Z"
          fill="#9FD356"
        />
      </svg>

      {/* Grass blades */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-around">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-6 bg-hill-green rounded-t-full animate-sway"
            style={{
              animationDelay: `${i * 0.2}s`,
              opacity: 0.7 + Math.random() * 0.3,
              height: `${16 + Math.random() * 16}px`,
            }}
          />
        ))}
      </div>

      {/* Flowers */}
      <Flower className="bottom-20 left-[10%]" color="#FF6B9D" />
      <Flower className="bottom-24 left-[25%]" color="#FFE66D" />
      <Flower className="bottom-20 left-[40%]" color="#FF8C42" />
      <Flower className="bottom-22 left-[60%]" color="#FF6B9D" />
      <Flower className="bottom-20 left-[75%]" color="#5BB1E8" />
      <Flower className="bottom-24 left-[90%]" color="#FFE66D" />

      {/* Muddy puddles */}
      <MuddyPuddle className="bottom-4 left-[15%]" />
      <MuddyPuddle className="bottom-6 left-[50%]" size="lg" />
      <MuddyPuddle className="bottom-4 left-[80%]" />
    </div>
  );
}

function Flower({ className = '', color = '#FF6B9D' }) {
  return (
    <div className={`absolute ${className}`}>
      <svg width="20" height="20" viewBox="0 0 20 20">
        {/* Petals */}
        <circle cx="10" cy="5" r="4" fill={color} />
        <circle cx="15" cy="10" r="4" fill={color} />
        <circle cx="10" cy="15" r="4" fill={color} />
        <circle cx="5" cy="10" r="4" fill={color} />
        {/* Center */}
        <circle cx="10" cy="10" r="3" fill="#FFE66D" />
      </svg>
    </div>
  );
}

function MuddyPuddle({ className = '', size = 'md' }) {
  const dimensions = size === 'lg' ? { w: 60, h: 20 } : { w: 40, h: 14 };

  return (
    <div className={`absolute ${className}`}>
      <svg width={dimensions.w} height={dimensions.h} viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}>
        {/* Puddle */}
        <ellipse
          cx={dimensions.w / 2}
          cy={dimensions.h / 2}
          rx={dimensions.w / 2 - 2}
          ry={dimensions.h / 2 - 2}
          fill="#8B7355"
        />
        {/* Shine */}
        <ellipse
          cx={dimensions.w / 3}
          cy={dimensions.h / 3}
          rx={dimensions.w / 6}
          ry={dimensions.h / 6}
          fill="white"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
