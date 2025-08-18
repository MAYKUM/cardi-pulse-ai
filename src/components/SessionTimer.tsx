import React from 'react';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, LogOut } from 'lucide-react';

export const SessionTimer: React.FC = () => {
  const { timeLeft, showWarning, resetTimer } = useSessionTimeout();
  const { logout } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {showWarning && (
        <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-md">
          <Clock className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive font-medium">Session expires in {timeLeft}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={resetTimer}
            className="h-6 px-2 text-xs"
          >
            Extend
          </Button>
        </div>
      )}
      
      {!showWarning && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{timeLeft}</span>
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={logout}
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
};