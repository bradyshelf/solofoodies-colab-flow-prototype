import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Minus, Plus, Percent, Euro } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DiscountSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  const selectedLocations = location.state?.selectedLocations || [];
  const foodieCount = location.state?.foodieCount || 4;
  const companionCount = location.state?.companionCount || 2;
  
  const [discountValue, setDiscountValue] = useState(100);
  const [isPercentage, setIsPercentage] = useState(true);

  const handleIncrease = () => {
    if (isPercentage) {
      setDiscountValue(prev => Math.min(prev + 5, 100));
    } else {
      setDiscountValue(prev => prev + 5);
    }
  };

  const handleDecrease = () => {
    if (isPercentage) {
      setDiscountValue(prev => Math.max(prev - 5, 0));
    } else {
      setDiscountValue(prev => Math.max(prev - 5, 0));
    }
  };

  const handleToggleDiscountType = (checked: boolean) => {
    const newIsPercentage = !checked;
    setIsPercentage(newIsPercentage);
    
    // If switching to percentage mode and current value is above 100, cap it at 100
    if (newIsPercentage && discountValue > 100) {
      setDiscountValue(100);
    }
  };

  const handleContinue = () => {
    console.log('Collaboration details:', {
      type: collaborationType,
      locations: selectedLocations,
      foodieCount: foodieCount,
      companionCount: companionCount,
      discount: {
        value: discountValue,
        type: isPercentage ? 'percentage' : 'fixed'
      }
    });

    // Navigate to date range selection page
    navigate('/collaborations/date-range', {
      state: {
        collaborationType,
        selectedLocations,
        foodieCount,
        companionCount,
        discount: {
          value: discountValue,
          type: isPercentage ? 'percentage' : 'fixed'
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/companions', {
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
            Tipo de descuento
          </h2>
        </div>

        {/* Discount Counter */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleDecrease} 
                disabled={discountValue <= 0}
                className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus className="w-6 h-6 text-white" />
              </button>
              
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2 flex items-center justify-center">
                  {discountValue}
                  {isPercentage ? <Percent className="w-8 h-8 ml-2" /> : <Euro className="w-8 h-8 ml-2" />}
                </div>
                <div className="text-orange-500 text-sm font-medium">descuento</div>
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

        {/* Discount Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 bg-gray-100 rounded-full p-2">
            <div className="flex items-center space-x-2">
              <Percent className="w-5 h-5 text-gray-600" />
              <span className={`text-sm font-medium ${isPercentage ? 'text-gray-900' : 'text-gray-500'}`}>
                %
              </span>
            </div>
            <Switch 
              checked={!isPercentage}
              onCheckedChange={handleToggleDiscountType}
            />
            <div className="flex items-center space-x-2">
              <Euro className="w-5 h-5 text-gray-600" />
              <span className={`text-sm font-medium ${!isPercentage ? 'text-gray-900' : 'text-gray-500'}`}>
                €
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-4 right-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/collaborations/companions', {
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
        >
          <ArrowLeft className="w-5 h-5 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default DiscountSelectionPage;
