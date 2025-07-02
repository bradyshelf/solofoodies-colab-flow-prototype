import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Calendar, Percent, Clock, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const CollaborationSummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const collaborationType = location.state?.collaborationType || '';
  const selectedLocations = location.state?.selectedLocations || [];
  const foodieCount = location.state?.foodieCount || 4;
  const companionCount = location.state?.companionCount || 2;
  const discount = location.state?.discount || { value: 100, type: 'percentage' };
  const dateRange = location.state?.dateRange;
  const availableDays = location.state?.availableDays || [];

  const formatDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return '';
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    return `Del ${format(fromDate, 'dd/MM/yy')} al ${format(toDate, 'dd/MM/yy')}`;
  };

  const formatDays = () => {
    if (availableDays.length === 0) return '';
    return availableDays.join(', ').toLowerCase();
  };

  const handleCreateCollaboration = () => {
    console.log('Creating collaboration with all details:', {
      type: collaborationType,
      locations: selectedLocations,
      foodieCount: foodieCount,
      companionCount: companionCount,
      discount: discount,
      dateRange: dateRange,
      availableDays: availableDays
    });

    // Navigate back to collaborations page with the new collaboration data
    navigate('/collaborations', {
      state: {
        newCollaboration: true,
        collaborationType,
        selectedLocations,
        foodieCount,
        companionCount,
        discount,
        dateRange,
        availableDays
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations/days', {
              state: {
                collaborationType,
                selectedLocations,
                foodieCount,
                companionCount,
                discount,
                dateRange
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Resumen de colaboración
          </h2>
        </div>

        {/* Summary Card */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-white text-lg font-semibold mb-4">
              Colaboración {collaborationType === 'public' ? 'pública' : 'privada'}
            </h3>
            
            <div className="space-y-4">
              {/* Foodies */}
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-white text-sm">
                  {foodieCount} foodies invitados
                </span>
              </div>

              {/* Date Range */}
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-white text-sm">
                  {formatDateRange()}
                </span>
              </div>

              {/* Discount */}
              <div className="flex items-center space-x-3">
                <Percent className="w-5 h-5 text-orange-500" />
                <span className="text-white text-sm">
                  {discount.value}{discount.type === 'percentage' ? '%' : '€'} Descuento
                </span>
              </div>

              {/* Companions */}
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-white text-sm">
                  {companionCount} acompañantes máx.
                </span>
              </div>

              {/* Available Days */}
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-white text-sm">
                  {formatDays()}
                </span>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <Button 
            onClick={handleCreateCollaboration}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium flex items-center justify-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>Crear colaboración</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSummaryPage;
