
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DaysSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  const selectedLocations = location.state?.selectedLocations || [];
  const foodieCount = location.state?.foodieCount || 4;
  const companionCount = location.state?.companionCount || 2;
  const discount = location.state?.discount || { value: 100, type: 'percentage' };
  const dateRange = location.state?.dateRange;
  
  const [selectedDays, setSelectedDays] = useState<string[]>([
    'Lunes', 'Martes', 'Miércoles', 'Jueves'
  ]);

  const days = [
    'Lunes',
    'Martes', 
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleContinue = () => {
    console.log('Collaboration details:', {
      type: collaborationType,
      locations: selectedLocations,
      foodieCount: foodieCount,
      companionCount: companionCount,
      discount: discount,
      dateRange: dateRange,
      availableDays: selectedDays
    });

    // Navigate to summary page
    navigate('/collaborations/summary', {
      state: {
        collaborationType,
        selectedLocations,
        foodieCount,
        companionCount,
        discount,
        dateRange,
        availableDays: selectedDays
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/date-range', {
              state: {
                collaborationType,
                selectedLocations,
                foodieCount,
                companionCount,
                discount
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
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Elige días disponibles
          </h2>
          <p className="text-gray-500 text-sm">
            Toca en los días para seleccionar o deseleccionar
          </p>
        </div>

        {/* Days Selection */}
        <div className="space-y-3 mb-8">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`w-full py-4 px-6 rounded-full text-lg font-medium transition-all ${
                selectedDays.includes(day)
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {selectedDays.includes(day) && (
                <span className="text-orange-500">{day}</span>
              )}
              {!selectedDays.includes(day) && (
                <span>{day}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/collaborations/date-range', {
            state: {
              collaborationType,
              selectedLocations,
              foodieCount,
              companionCount,
              discount
            }
          })} 
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <Button 
          onClick={handleContinue} 
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
          disabled={selectedDays.length === 0}
        >
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default DaysSelectionPage;
