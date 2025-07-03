import { useState, useEffect } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LocationSection from '@/components/collaboration/LocationSection';
import ParticipantsSection from '@/components/collaboration/ParticipantsSection';
import FollowersSection from '@/components/collaboration/FollowersSection';
import DiscountSection from '@/components/collaboration/DiscountSection';
import DaysSection from '@/components/collaboration/DaysSection';
import DescriptionSection from '@/components/collaboration/DescriptionSection';
import CollaborationPreview from '@/components/collaboration/CollaborationPreview';

const CreateCollaborationPageV2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Form state - removed collaborationType
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['local-valencia']);
  const [companionCount, setCompanionCount] = useState([1]);
  const [minFollowerCount, setMinFollowerCount] = useState([10000]);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState([100]);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Lunes', 'Martes', 'Miércoles', 'Jueves']);
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Pre-populate form if in edit mode
  useEffect(() => {
    if (location.state?.editMode) {
      setSelectedLocations(location.state.selectedLocations || ['local-valencia']);
      setCompanionCount([location.state.companionCount || 1]);
      setDiscountType(location.state.discount?.type || 'percentage');
      setDiscountValue([location.state.discount?.value || 100]);
      setSelectedDays(location.state.availableDays || []);
      setDescription(location.state.description || '');
      setEditingId(location.state.editingId || null);
    }
  }, [location.state]);

  const locations = [{
    id: 'local-valencia',
    name: 'Local Valencia',
    address: 'Calle Colon, 27'
  }, {
    id: 'sucursal-barcelona',
    name: 'Sucursal Barcelona',
    address: 'Passeig de Gracia, 92'
  }, {
    id: 'sede-central',
    name: 'Sede Central',
    address: 'Calle Gran Via, 45'
  }, {
    id: 'local-madrid',
    name: 'Local Madrid',
    address: 'Calle Alcalá, 123'
  }];
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const toggleLocation = (locationId: string) => {
    setSelectedLocations(prev => prev.includes(locationId) ? prev.filter(id => id !== locationId) : [...prev, locationId]);
  };
  const toggleDay = (day: string) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };
  const handleBackNavigation = () => {
    navigate('/collaborations', {
      replace: true
    });
  };
  const handleCreateCollaboration = () => {
    const collaborationData = {
      type: 'public',
      // Always public now
      locations: selectedLocations,
      companionCount: companionCount[0],
      minFollowerCount: minFollowerCount[0],
      discount: {
        value: discountValue[0],
        type: discountType
      },
      availableDays: selectedDays,
      description,
      editingId
    };
    console.log(editingId ? 'Updating collaboration:' : 'Creating collaboration:', collaborationData);

    // Always navigate back to collaborations with the collaboration data
    navigate('/collaborations', {
      state: {
        newCollaboration: !editingId,
        updatedCollaboration: editingId,
        collaborationType: 'public',
        // Always public
        selectedLocations,
        companionCount: companionCount[0],
        minFollowerCount: minFollowerCount[0],
        discount: {
          value: discountValue[0],
          type: discountType
        },
        availableDays: selectedDays,
        description,
        editingId
      }
    });
  };
  const isFormValid = selectedLocations.length > 0 && selectedDays.length > 0 && description.trim().length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={handleBackNavigation} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Editar Colaboración' : 'Crear Colaboración'}
          </h1>
        </div>
      </div>

      <div className="px-3 py-3 max-w-2xl mx-auto">
        {/* Info Header */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg py-[7px]">
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-700 mt-1">
                Define las condiciones de tu colaboración y recibe solicitudes de foodies interesados
              </p>
            </div>
          </div>
        </div>

        {/* Main Form - Single column layout */}
        <div className="space-y-3 mb-4">
          <LocationSection selectedLocations={selectedLocations} locations={locations} onLocationToggle={toggleLocation} />

          <FollowersSection minFollowerCount={minFollowerCount} onMinFollowerCountChange={setMinFollowerCount} />

          <ParticipantsSection companionCount={companionCount} onCompanionCountChange={setCompanionCount} />

          <DiscountSection discountType={discountType} discountValue={discountValue} onDiscountTypeChange={setDiscountType} onDiscountValueChange={setDiscountValue} />

          <DaysSection selectedDays={selectedDays} days={days} onDayToggle={toggleDay} />

          <DescriptionSection description={description} onDescriptionChange={setDescription} />
        </div>

        {/* Preview - Always at bottom */}
        <div className="w-full">
          <CollaborationPreview collaborationType="public" selectedLocations={selectedLocations} locations={locations} companionCount={companionCount[0]} minFollowerCount={minFollowerCount[0]} discountType={discountType} discountValue={discountValue[0]} selectedDays={selectedDays} isFormValid={isFormValid} onCreateCollaboration={handleCreateCollaboration} isEditMode={!!editingId} />
        </div>
      </div>
    </div>
  );
};

export default CreateCollaborationPageV2;
