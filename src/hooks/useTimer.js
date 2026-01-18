import { useEffect, useRef, useCallback } from 'react';
import { TIMER_WARNING, TIMER_CRITICAL } from '../utils/constants';

export function useTimer(
  timeRemaining,
  isActive,
  onTick,
  onExpired
) {
  const intervalRef = useRef(null);

  // Clear interval on unmount or when inactive
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        onTick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, onTick]);

  // Check for timer expiration
  useEffect(() => {
    if (timeRemaining <= 0 && isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onExpired();
    }
  }, [timeRemaining, isActive, onExpired]);

  // Computed states
  const isWarning = timeRemaining <= TIMER_WARNING && timeRemaining > TIMER_CRITICAL;
  const isCritical = timeRemaining <= TIMER_CRITICAL && timeRemaining > 0;
  const isExpired = timeRemaining <= 0;

  // Progress percentage (for circular progress)
  const getProgress = useCallback(
    (totalTime) => {
      if (totalTime <= 0) return 0;
      return (timeRemaining / totalTime) * 100;
    },
    [timeRemaining]
  );

  return {
    timeRemaining,
    isWarning,
    isCritical,
    isExpired,
    getProgress,
  };
}
