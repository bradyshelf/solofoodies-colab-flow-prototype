import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Users, Minus, Plus } from 'lucide-react';
interface ParticipantsSectionProps {
  companionCount: number[];
  minFollowerCount: number[];
  onCompanionCountChange: (count: number[]) => void;
  onMinFollowerCountChange: (count: number[]) => void;
}
const ParticipantsSection = ({
  companionCount,
  minFollowerCount,
  onCompanionCountChange,
  onMinFollowerCountChange
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
  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }
    return count.toString();
  };
  return <Card>
      <CardContent className="p-4 space-y-6">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Participantes</h3>
        </div>
        
        <div className="w-full">
          <Label className="text-sm font-medium mb-3 block">Acompañantes máx por foodie</Label>
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between w-full">
            <Button variant="ghost" size="icon" onClick={handleCompanionDecrement} disabled={companionCount[0] <= 0} className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50 shadow-sm flex-shrink-0">
              <Minus className="w-4 h-4" />
            </Button>
            <div className="text-center px-4 flex-1">
              <div className="text-xl font-bold text-gray-900">{companionCount[0]}</div>
              <div className="text-xs text-orange-500">acompañantes</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCompanionIncrement} disabled={companionCount[0] >= 10} className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50 shadow-sm flex-shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="py-[20px]">
          <Label className="text-sm font-medium mb-3 block">
            Mínimo seguidores: {formatFollowerCount(minFollowerCount[0])}
          </Label>
          <div className="space-y-3">
            <Slider value={minFollowerCount} onValueChange={onMinFollowerCountChange} max={30000} min={1000} step={1000} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1k</span>
              <span className="text-center">foodies disponibles</span>
              <span>30k</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default ParticipantsSection;