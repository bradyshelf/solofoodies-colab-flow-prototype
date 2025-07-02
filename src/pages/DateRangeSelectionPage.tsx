
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DateRange } from 'react-day-picker';

const DateRangeSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  const selectedLocations = location.state?.selectedLocations || [];
  const foodieCount = location.state?.foodieCount || 4;
  const companionCount = location.state?.companionCount || 2;
  const discount = location.state?.discount || { value: 100, type: 'percentage' };
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleContinue = () => {
    console.log('Collaboration details:', {
      type: collaborationType,
      locations: selectedLocations,
      foodieCount: foodieCount,
      companionCount: companionCount,
      discount: discount,
      dateRange: dateRange
    });

    // Navigate to days selection page
    navigate('/collaborations/days', {
      state: {
        collaborationType,
        selectedLocations,
        foodieCount,
        companionCount,
        discount,
        dateRange
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/discount', {
              state: {
                collaborationType,
                selectedLocations,
                foodieCount,
                companionCount
              }
            })} 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">ATRÁS</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Elige un rango de fecha
          </h2>
        </div>

        {/* Calendar */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-2xl p-4 w-full max-w-xs">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="text-white"
              classNames={{
                months: "flex flex-col space-y-4",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center text-white mb-4",
                caption_label: "text-sm font-medium text-white",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white hover:bg-gray-700 rounded",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex justify-between mb-2",
                head_cell: "text-gray-400 w-8 h-8 font-normal text-xs flex items-center justify-center",
                row: "flex justify-between mb-1",
                cell: "w-8 h-8 flex items-center justify-center",
                day: "w-8 h-8 p-0 font-normal hover:bg-gray-600 rounded-full flex items-center justify-center text-white text-sm transition-colors",
                day_range_end: "bg-orange-500 text-white rounded-full hover:bg-orange-600",
                day_selected: "bg-orange-500 text-white rounded-full hover:bg-orange-600",
                day_today: "bg-gray-700 text-white rounded-full",
                day_outside: "text-gray-600 opacity-50",
                day_disabled: "text-gray-600 opacity-50",
                day_range_middle: "bg-orange-500/30 text-white hover:bg-orange-500/50 rounded-none",
                day_range_start: "bg-orange-500 text-white rounded-full hover:bg-orange-600",
                day_hidden: "invisible",
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/collaborations/discount', {
            state: {
              collaborationType,
              selectedLocations,
              foodieCount,
              companionCount
            }
          })} 
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <Button 
          onClick={handleContinue} 
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
          disabled={!dateRange?.from}
        >
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default DateRangeSelectionPage;
