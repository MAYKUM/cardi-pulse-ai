import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Stethoscope, LogIn, Brain, Eye } from 'lucide-react';
import type { UserType } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<UserType | ''>('');

  const handleLogin = () => {
    if (selectedSpecialty) {
      const route = selectedSpecialty === 'cardio'
        ? 'cardiology'
        : selectedSpecialty === 'neurology'
        ? 'neurology'
        : selectedSpecialty === 'orthopedics'
        ? 'orthopedics'
        : selectedSpecialty === 'ophthalmology'
        ? 'ophthalmology'
        : 'general-medicine';
      navigate(`/login/${route}`);
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
                <SelectItem value="orthopedics">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5z" />
                    </svg>
                    <span>Orthopedics</span>
                  </div>
                </SelectItem>
                <SelectItem value="generic">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-accent" />
                    <span>General Medicine</span>
                  </div>
                </SelectItem>
                <SelectItem value="ophthalmology">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>Ophthalmology</span>
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
                  : selectedSpecialty === 'orthopedics'
                  ? 'Accessing specialized orthopedic surgery platform'
                  : 'Accessing multi-specialty medical platform'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};