import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompanionsSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  const selectedLocations = location.state?.selectedLocations || [];
  const foodieCount = location.state?.foodieCount || 4;
  
  const [companionCount, setCompanionCount] = useState(2);

  const handleIncrease = () => {
    setCompanionCount(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (companionCount > 0) {
      setCompanionCount(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    console.log('Collaboration details:', {
      type: collaborationType,
      locations: selectedLocations,
      foodieCount: foodieCount,
      companionCount: companionCount
    });

    // Navigate to discount selection page
    navigate('/collaborations/discount', {
      state: {
        collaborationType,
        selectedLocations,
        foodieCount,
        companionCount
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/foodies', {
              state: {
                collaborationType,
                selectedLocations,
                foodieCount
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
            Número de acompañantes permitidos por foodie
          </h2>
        </div>

        {/* Companion Counter */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleDecrease} 
                disabled={companionCount <= 0}
                className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus className="w-6 h-6 text-white" />
              </button>
              
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">{companionCount}</div>
                <div className="text-orange-500 text-sm font-medium">acompañantes</div>
              </div>
              
              <button 
                onClick={handleIncrease} 
                className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/collaborations/foodies', {
            state: {
              collaborationType,
              selectedLocations,
              foodieCount
            }
          })} 
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <Button 
          onClick={handleContinue} 
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default CompanionsSelectionPage;
