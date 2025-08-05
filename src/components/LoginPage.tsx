import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Stethoscope } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Medical Platform</h1>
          <p className="text-muted-foreground">Choose your specialty to continue</p>
        </div>
        
        <div className="grid gap-4">
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105" 
                onClick={() => login('cardio')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Cardiology</CardTitle>
              <CardDescription>
                Specialized cardiovascular care platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={(e) => {
                  e.stopPropagation();
                  login('cardio');
                }}
              >
                Enter Cardiology Portal
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105" 
                onClick={() => login('generic')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">General Medicine</CardTitle>
              <CardDescription>
                Multi-specialty medical platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  login('generic');
                }}
              >
                Enter Medical Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};