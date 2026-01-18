export function PigAvatar({
  color = '#FF6B9D',
  size = 60,
  expression = 'happy',
  className = '',
}) {
  // Expression configurations
  const expressions = {
    happy: {
      eyeY: 42,
      mouthPath: 'M 35 58 Q 50 68 65 58', // Smile
    },
    thinking: {
      eyeY: 40,
      mouthPath: 'M 40 60 L 60 60', // Straight line
    },
    speaking: {
      eyeY: 42,
      mouthPath: 'M 38 55 Q 50 65 62 55 Q 50 70 38 55', // Open mouth
    },
    sad: {
      eyeY: 44,
      mouthPath: 'M 35 65 Q 50 55 65 65', // Frown
    },
    excited: {
      eyeY: 40,
      mouthPath: 'M 35 55 Q 50 72 65 55', // Big smile
    },
  };

  const expr = expressions[expression] || expressions.happy;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      {/* Ears */}
      <ellipse cx="20" cy="25" rx="15" ry="20" fill={color} />
      <ellipse cx="80" cy="25" rx="15" ry="20" fill={color} />
      <ellipse cx="20" cy="25" rx="10" ry="14" fill={`${color}CC`} />
      <ellipse cx="80" cy="25" rx="10" ry="14" fill={`${color}CC`} />

      {/* Head */}
      <circle cx="50" cy="55" r="40" fill={color} />

      {/* Snout */}
      <ellipse cx="50" cy="60" rx="18" ry="14" fill={`${color}DD`} />

      {/* Nostrils */}
      <ellipse cx="44" cy="60" rx="4" ry="3" fill="#8B7355" />
      <ellipse cx="56" cy="60" rx="4" ry="3" fill="#8B7355" />

      {/* Eyes */}
      <circle cx="35" cy={expr.eyeY} r="6" fill="white" />
      <circle cx="65" cy={expr.eyeY} r="6" fill="white" />
      <circle cx="36" cy={expr.eyeY + 1} r="3" fill="#2C3E50" />
      <circle cx="66" cy={expr.eyeY + 1} r="3" fill="#2C3E50" />

      {/* Eye shine */}
      <circle cx="37" cy={expr.eyeY - 1} r="1.5" fill="white" />
      <circle cx="67" cy={expr.eyeY - 1} r="1.5" fill="white" />

      {/* Blush */}
      <ellipse cx="25" cy="52" rx="8" ry="5" fill="#FF9EB5" opacity="0.5" />
      <ellipse cx="75" cy="52" rx="8" ry="5" fill="#FF9EB5" opacity="0.5" />

      {/* Mouth */}
      <path
        d={expr.mouthPath}
        stroke="#8B7355"
        strokeWidth="3"
        strokeLinecap="round"
        fill={expression === 'speaking' ? '#FF9999' : 'none'}
      />
    </svg>
  );
}
