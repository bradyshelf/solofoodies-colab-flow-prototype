
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Users, Minus, Plus } from 'lucide-react';

interface ParticipantsSectionProps {
  companionCount: number[];
  onCompanionCountChange: (count: number[]) => void;
}

const ParticipantsSection = ({
  companionCount,
  onCompanionCountChange
}: ParticipantsSectionProps) => {
  const handleCompanionDecrement = () => {
    if (companionCount[0] > 0) {
      onCompanionCountChange([companionCount[0] - 1]);
    }
  };

  const handleCompanionIncrement = () => {
    if (companionCount[0] < 10) {
      onCompanionCountChange([companionCount[0] + 1]);
    }
  };

  return (
    <Card>
      <CardContent className="p-3 space-y-4">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Participantes</h3>
        </div>
        
        <div className="w-full">
          <Label className="text-sm font-medium mb-2 block">Acompañantes máx por foodie</Label>
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between w-full">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCompanionDecrement} 
              disabled={companionCount[0] <= 0} 
              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50 shadow-sm flex-shrink-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="text-center px-4 flex-1">
              <div className="text-xl font-bold text-gray-900">{companionCount[0]}</div>
              <div className="text-xs text-orange-500">acompañantes addicional</div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCompanionIncrement} 
              disabled={companionCount[0] >= 10} 
              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50 shadow-sm flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantsSection;
