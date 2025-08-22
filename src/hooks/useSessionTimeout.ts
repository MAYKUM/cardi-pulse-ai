import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useSessionTimeout = () => {
  const { logout, user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(SESSION_TIMEOUT);
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<number>();
  const intervalRef = useRef<number>();
  const lastActivityRef = useRef(Date.now());

  const resetTimer = () => {
    if (!user) return;
    
    lastActivityRef.current = Date.now();
    setTimeLeft(SESSION_TIMEOUT);
    setShowWarning(false);

    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start countdown
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const remaining = SESSION_TIMEOUT - elapsed;

      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        logout();
        return;
      }

      setTimeLeft(remaining);
      
      // Show warning in last 30 seconds
      if (remaining <= 30000 && !showWarning) {
        setShowWarning(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!user) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetTimer();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Start initial timer
    resetTimer();

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [user]);

  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft: formatTime(timeLeft),
    showWarning,
    resetTimer
  };
};