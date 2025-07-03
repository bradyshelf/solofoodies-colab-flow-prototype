
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Users } from 'lucide-react';

interface FollowersSectionProps {
  minFollowerCount: number[];
  onMinFollowerCountChange: (count: number[]) => void;
}

const FollowersSection = ({
  minFollowerCount,
  onMinFollowerCountChange
}: FollowersSectionProps) => {
  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }
    return count.toString();
  };

  return (
    <Card>
      <CardContent className="p-3 space-y-4">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Seguidores</h3>
        </div>
        
        <div className="py-2">
          <Label className="text-sm font-medium mb-2 block">
            Mínimo seguidores: {formatFollowerCount(minFollowerCount[0])}
          </Label>
          <div className="space-y-3">
            <Slider 
              value={minFollowerCount} 
              onValueChange={onMinFollowerCountChange} 
              max={30000} 
              min={1000} 
              step={1000} 
              className="w-full" 
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1k</span>
              <span className="text-center">foodies disponibles</span>
              <span>30k</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowersSection;
