import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Bug, Wifi, Shield } from 'lucide-react';

interface ErrorStateProps {
  variant?: 'default' | 'network' | 'auth' | 'notfound' | 'security' | 'validation';
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  showDetails?: boolean;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  variant = 'default',
  title,
  message,
  details,
  onRetry,
  onGoBack,
  onGoHome,
  showDetails = false,
  className = ''
}) => {
  const variants = {
    default: {
      icon: AlertTriangle,
      title: title || 'Something went wrong',
      message: message || 'An unexpected error occurred. Please try again.',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    network: {
      icon: Wifi,
      title: title || 'Connection Problem',
      message: message || 'Unable to connect to the server. Please check your internet connection.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    auth: {
      icon: Shield,
      title: title || 'Authentication Required',
      message: message || 'You need to be logged in to access this resource.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    notfound: {
      icon: AlertTriangle,
      title: title || 'Page Not Found',
      message: message || 'The page you are looking for does not exist or has been moved.',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    security: {
      icon: Shield,
      title: title || 'Access Denied',
      message: message || 'You do not have permission to access this resource.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    validation: {
      icon: Bug,
      title: title || 'Invalid Data',
      message: message || 'The data provided is invalid or incomplete.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`flex items-center justify-center min-h-[400px] p-4 ${className}`}>
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className={`mx-auto mb-4 h-16 w-16 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`h-8 w-8 ${config.color}`} />
          </div>
          <CardTitle className="text-xl">{config.title}</CardTitle>
          <CardDescription className="text-base">
            {config.message}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {details && showDetails && (
            <Alert>
              <Bug className="h-4 w-4" />
              <AlertDescription>
                <details className="cursor-pointer">
                  <summary className="font-medium">Technical Details</summary>
                  <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                    {details}
                  </pre>
                </details>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            {onRetry && (
              <Button onClick={onRetry} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            
            {onGoBack && (
              <Button variant="outline" onClick={onGoBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            )}
            
            {onGoHome && (
              <Button variant="outline" onClick={onGoHome} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {variant === 'network' && (
              <p>Check your internet connection and try refreshing the page.</p>
            )}
            {variant === 'auth' && (
              <p>Please log in to continue using the application.</p>
            )}
            {variant === 'security' && (
              <p>Contact your administrator if you believe this is an error.</p>
            )}
            {variant === 'validation' && (
              <p>Please check your input and try again.</p>
            )}
            {variant === 'default' && (
              <p>If the problem persists, please contact support.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};