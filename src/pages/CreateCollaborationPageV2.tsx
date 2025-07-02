import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import CollaborationTypeSection from '@/components/collaboration/CollaborationTypeSection';
import LocationSection from '@/components/collaboration/LocationSection';
import ParticipantsSection from '@/components/collaboration/ParticipantsSection';
import DiscountSection from '@/components/collaboration/DiscountSection';
import DaysSection from '@/components/collaboration/DaysSection';
import CollaborationPreview from '@/components/collaboration/CollaborationPreview';

const CreateCollaborationPageV2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form state
  const [collaborationType, setCollaborationType] = useState<'public' | 'private'>('public');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [companionCount, setCompanionCount] = useState([2]);
  const [minFollowerCount, setMinFollowerCount] = useState([10000]);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState([100]);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Lunes', 'Martes', 'Miércoles', 'Jueves']);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Pre-populate form if in edit mode
  useEffect(() => {
    if (location.state?.editMode) {
      setCollaborationType(location.state.collaborationType || 'public');
      setSelectedLocations(location.state.selectedLocations || []);
      setCompanionCount([location.state.companionCount || 2]);
      setDiscountType(location.state.discount?.type || 'percentage');
      setDiscountValue([location.state.discount?.value || 100]);
      setSelectedDays(location.state.availableDays || []);
      setEditingId(location.state.editingId || null);
    }
  }, [location.state]);

  const locations = [
    { id: 'local-valencia', name: 'Local Valencia', address: 'Calle Colon, 27' },
    { id: 'sucursal-barcelona', name: 'Sucursal Barcelona', address: 'Passeig de Gracia, 92' },
    { id: 'sede-central', name: 'Sede Central', address: 'Calle Gran Via, 45' }
  ];

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const toggleLocation = (locationId: string) => {
    setSelectedLocations(prev => 
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleBackNavigation = () => {
    // When going back, we navigate without any state to avoid triggering updates
    // This ensures the original collaboration remains unchanged in edit mode
    navigate('/collaborations', { replace: true });
  };

  const handleCreateCollaboration = () => {
    const collaborationData = {
      type: collaborationType,
      locations: selectedLocations,
      companionCount: companionCount[0],
      minFollowerCount: minFollowerCount[0],
      discount: { value: discountValue[0], type: discountType },
      availableDays: selectedDays,
      editingId
    };

    console.log(editingId ? 'Updating collaboration:' : 'Creating collaboration:', collaborationData);

    // If it's a private collaboration and not in edit mode, go to foodie selection
    if (collaborationType === 'private' && !editingId) {
      navigate('/foodies/select', {
        state: {
          collaborationType,
          selectedLocations,
          companionCount: companionCount[0],
          minFollowerCount: minFollowerCount[0],
          discount: { value: discountValue[0], type: discountType },
          availableDays: selectedDays
        }
      });
      return;
    }

    // Otherwise, navigate back to collaborations with the collaboration data
    navigate('/collaborations', {
      state: {
        newCollaboration: !editingId,
        updatedCollaboration: editingId,
        collaborationType,
        selectedLocations,
        companionCount: companionCount[0],
        minFollowerCount: minFollowerCount[0],
        discount: { value: discountValue[0], type: discountType },
        availableDays: selectedDays,
        editingId
      }
    });
  };

  const isFormValid = selectedLocations.length > 0 && selectedDays.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBackNavigation}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Editar Colaboración' : 'Crear Colaboración'}
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-6xl mx-auto">
        {/* Main Form */}
        <div className="flex-1 space-y-6">
          <CollaborationTypeSection
            collaborationType={collaborationType}
            onCollaborationTypeChange={setCollaborationType}
          />

          <LocationSection
            selectedLocations={selectedLocations}
            locations={locations}
            onLocationToggle={toggleLocation}
          />

          <ParticipantsSection
            companionCount={companionCount}
            minFollowerCount={minFollowerCount}
            onCompanionCountChange={setCompanionCount}
            onMinFollowerCountChange={setMinFollowerCount}
          />

          <DiscountSection
            discountType={discountType}
            discountValue={discountValue}
            onDiscountTypeChange={setDiscountType}
            onDiscountValueChange={setDiscountValue}
          />

          <DaysSection
            selectedDays={selectedDays}
            days={days}
            onDayToggle={toggleDay}
          />
        </div>

        {/* Live Preview */}
        <CollaborationPreview
          collaborationType={collaborationType}
          selectedLocations={selectedLocations}
          locations={locations}
          companionCount={companionCount[0]}
          minFollowerCount={minFollowerCount[0]}
          discountType={discountType}
          discountValue={discountValue[0]}
          selectedDays={selectedDays}
          isFormValid={isFormValid}
          onCreateCollaboration={handleCreateCollaboration}
          isEditMode={!!editingId}
        />
      </div>
    </div>
  );
};

export default CreateCollaborationPageV2;
