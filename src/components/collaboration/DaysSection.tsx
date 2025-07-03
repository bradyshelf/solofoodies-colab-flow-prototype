
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
interface DaysSectionProps {
  selectedDays: string[];
  days: string[];
  onDayToggle: (day: string) => void;
}
const DaysSection = ({
  selectedDays,
  days,
  onDayToggle
}: DaysSectionProps) => {
  return <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Días disponibles ({selectedDays.length})</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {days.map(day => <button key={day} onClick={() => onDayToggle(day)} className={`p-3 rounded-lg text-sm font-medium transition-all ${selectedDays.includes(day) ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {day}
            </button>)}
        </div>
      </CardContent>
    </Card>;
};
export default DaysSection;
