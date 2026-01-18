import { useGame } from '../../context/GameContext';
import { useTimer } from '../../hooks/useTimer';

export function Timer() {
  const { timeRemaining, timerDuration, isPlaying, timerTick, timerExpired } =
    useGame();

  const { isWarning, isCritical } = useTimer(
    timeRemaining,
    isPlaying,
    timerTick,
    timerExpired
  );

  // Calculate progress for the circular indicator
  const progress = timerDuration > 0 ? (timeRemaining / timerDuration) * 100 : 0;
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Color based on time remaining
  const getColor = () => {
    if (isCritical) return '#FF6B6B'; // Error red
    if (isWarning) return '#FF8C42'; // Mummy orange
    return '#FFE66D'; // Sunshine yellow
  };

  const getBgColor = () => {
    if (isCritical) return '#FED7D7';
    if (isWarning) return '#FFECD2';
    return '#FFF9DB';
  };

  return (
    <div
      className={`
        relative w-32 h-32 md:w-40 md:h-40
        ${isCritical ? 'animate-shake' : ''}
        ${isWarning || isCritical ? 'animate-pulse-slow' : ''}
      `}
    >
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="54"
          fill={getBgColor()}
          stroke="#E8E8E8"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <circle
          cx="50%"
          cy="50%"
          r="54"
          fill="transparent"
          stroke={getColor()}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>

      {/* Timer text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`
            text-4xl md:text-5xl font-peppa
            ${isCritical ? 'text-error-red' : isWarning ? 'text-mummy-orange' : 'text-gray-800'}
          `}
        >
          {timeRemaining}
        </span>
        <span className="text-xs md:text-sm font-body text-gray-500">
          seconds
        </span>
      </div>
    </div>
  );
}
