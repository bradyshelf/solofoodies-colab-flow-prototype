
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface DateRangeSectionProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const DateRangeSection = ({ dateRange, onDateRangeChange }: DateRangeSectionProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <CalendarIcon className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Fechas</h3>
        </div>
        <div className="flex justify-center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={1}
            className="p-3 pointer-events-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DateRangeSection;
