import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Stethoscope, LogIn, Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserType } from '@/contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState<UserType | ''>('');

  const handleLogin = () => {
    if (selectedSpecialty) {
      login(selectedSpecialty);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Medical Platform</h1>
          <p className="text-muted-foreground">Select your specialty and login to continue</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Choose Your Specialty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedSpecialty} onValueChange={(value: UserType) => setSelectedSpecialty(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select medical specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardio">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <span>Cardiology</span>
                  </div>
                </SelectItem>
                <SelectItem value="neurology">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span>Neurology</span>
                  </div>
                </SelectItem>
                <SelectItem value="generic">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-accent" />
                    <span>General Medicine</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={!selectedSpecialty}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login to Portal
            </Button>
            
            {selectedSpecialty && (
              <div className="text-sm text-muted-foreground text-center">
                {selectedSpecialty === 'cardio' 
                  ? 'Accessing specialized cardiovascular care platform' 
                  : selectedSpecialty === 'neurology'
                  ? 'Accessing specialized neurological care platform'
                  : 'Accessing multi-specialty medical platform'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};