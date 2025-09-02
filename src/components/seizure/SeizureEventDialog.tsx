import React, { memo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface SeizureEvent {
  id?: string;
  date?: string;
  time?: string;
  type?: string;
  duration?: number;
  severity?: 'mild' | 'moderate' | 'severe';
  triggers?: string[];
  location?: string;
  witnesses?: boolean;
  description?: string;
  recovery_time?: number;
}

interface SeizureEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newEvent: Partial<SeizureEvent>;
  onEventChange: (event: Partial<SeizureEvent>) => void;
  onSave: () => void;
}

const seizureTypes = [
  'Tonic-Clonic',
  'Focal Aware',
  'Focal Impaired Awareness',
  'Absence',
  'Myoclonic',
  'Atonic',
  'Tonic',
  'Clonic'
];

const SeizureEventDialog = memo(function SeizureEventDialog({
  isOpen,
  onOpenChange,
  newEvent,
  onEventChange,
  onSave
}: SeizureEventDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Log Seizure
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log New Seizure Event</DialogTitle>
          <DialogDescription>
            Record details of the seizure event for medical tracking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => onEventChange({...newEvent, date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) => onEventChange({...newEvent, time: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="type">Seizure Type</Label>
            <Select onValueChange={(value) => onEventChange({...newEvent, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select seizure type" />
              </SelectTrigger>
              <SelectContent>
                {seizureTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="120"
                onChange={(e) => onEventChange({...newEvent, duration: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select onValueChange={(value: 'mild' | 'moderate' | 'severe') => onEventChange({...newEvent, severity: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Home - Bedroom"
              onChange={(e) => onEventChange({...newEvent, location: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what happened during the seizure..."
              onChange={(e) => onEventChange({...newEvent, description: e.target.value})}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={onSave} className="flex-1">Save Event</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default SeizureEventDialog;