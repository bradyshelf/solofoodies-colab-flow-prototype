import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus, MapPin, Users, Calendar, Percent, Clock, Edit, Trash2, Pause, Play } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

interface Collaboration {
  id: string;
  type: string;
  locations: string[];
  companionCount: number;
  discount: { value: number; type: string };
  dateRange?: { from: Date; to: Date };
  availableDays: string[];
  description?: string;
  createdAt: Date;
  isPaused?: boolean;
}

const CollaborationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collaborations, setCollaborations] = useState<Collaboration[]>([
    {
      id: '1',
      type: 'public',
      locations: ['local-valencia', 'local-madrid'],
      companionCount: 3,
      discount: { value: 20, type: 'percentage' },
      dateRange: { 
        from: new Date('2024-01-15'), 
        to: new Date('2024-02-15') 
      },
      availableDays: ['Lunes', 'Martes', 'Miércoles'],
      description: 'Colaboración para promocionar nuestro nuevo menú mediterráneo',
      createdAt: new Date('2024-01-01'),
      isPaused: false
    },
    {
      id: '2',
      type: 'private',
      locations: ['local-barcelona'],
      companionCount: 2,
      discount: { value: 50, type: 'fixed' },
      availableDays: ['Viernes', 'Sábado', 'Domingo'],
      description: 'Colaboración exclusiva para influencers de cocina catalana',
      createdAt: new Date('2024-01-10'),
      isPaused: false
    }
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('CollaborationsPage useEffect triggered with location.state:', location.state);
    
    // Check if we're returning from collaboration creation with a new collaboration
    if (location.state?.newCollaboration) {
      console.log('Processing new collaboration');
      const newCollab: Collaboration = {
        id: Date.now().toString(),
        type: location.state.collaborationType || 'public',
        locations: location.state.selectedLocations || [],
        companionCount: location.state.companionCount || 2,
        discount: location.state.discount || { value: 100, type: 'percentage' },
        dateRange: location.state.dateRange,
        availableDays: location.state.availableDays || [],
        description: location.state.description || '',
        createdAt: new Date()
      };
      
      setCollaborations(prev => {
        console.log('Adding new collaboration:', newCollab);
        return [newCollab, ...prev];
      });
    }
    
    // Check if we're returning from collaboration editing with updates
    if (location.state?.updatedCollaboration && location.state?.editingId) {
      console.log('Processing collaboration update for ID:', location.state.editingId);
      const editingId = location.state.editingId;
      
      setCollaborations(prev => {
        console.log('Current collaborations before update:', prev);
        const updated = prev.map(collab => {
          if (collab.id === editingId) {
            const updatedCollab = {
              ...collab,
              type: location.state.collaborationType || collab.type,
              locations: location.state.selectedLocations || collab.locations,
              companionCount: location.state.companionCount || collab.companionCount,
              discount: location.state.discount || collab.discount,
              availableDays: location.state.availableDays || collab.availableDays,
              description: location.state.description || collab.description,
              // Keep the original creation date
              createdAt: collab.createdAt
            };
            console.log('Updated collaboration:', updatedCollab);
            return updatedCollab;
          }
          return collab;
        });
        console.log('Collaborations after update:', updated);
        return updated;
      });
    }

    // Only clear the state after processing to prevent timing issues
    if (location.state?.newCollaboration || location.state?.updatedCollaboration) {
      // Use setTimeout to ensure state updates are processed first
      setTimeout(() => {
        console.log('Clearing navigation state');
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location.state]);

  const formatDateRange = (dateRange?: { from: Date; to: Date }) => {
    if (!dateRange?.from || !dateRange?.to) return '';
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    return `${format(fromDate, 'dd/MM/yy')} - ${format(toDate, 'dd/MM/yy')}`;
  };

  const getLocationName = (locationId: string) => {
    const locationMap: { [key: string]: string } = {
      'local-valencia': 'Valencia',
      'local-madrid': 'Madrid',
      'local-barcelona': 'Barcelona',
      'sucursal-barcelona': 'Barcelona',
      'sede-central': 'Sede Central'
    };
    return locationMap[locationId] || locationId;
  };

  const handleEditCollaboration = (collab: Collaboration) => {
    console.log('Editing collaboration:', collab);
    navigate('/collaborations/create', {
      state: {
        editMode: true,
        collaborationType: collab.type,
        selectedLocations: collab.locations,
        companionCount: collab.companionCount,
        discount: collab.discount,
        availableDays: collab.availableDays,
        description: collab.description,
        editingId: collab.id
      }
    });
  };

  const handleDeleteCollaboration = (collabId: string) => {
    setCollaborations(prev => prev.filter(collab => collab.id !== collabId));
  };

  const handlePauseCollaboration = (collabId: string) => {
    setCollaborations(prev => 
      prev.map(collab => 
        collab.id === collabId 
          ? { ...collab, isPaused: true }
          : collab
      )
    );
  };

  const handleReactivateCollaboration = (collabId: string) => {
    setCollaborations(prev => 
      prev.map(collab => 
        collab.id === collabId 
          ? { ...collab, isPaused: false }
          : collab
      )
    );
  };

  const activeCollaborations = collaborations.filter(collab => !collab.isPaused);
  const pausedCollaborations = collaborations.filter(collab => collab.isPaused);

  const renderCollaborationCard = (collab: Collaboration) => (
    <Card key={collab.id} className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {collab.isPaused && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pausada
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Colaboración
            </h3>
            {collab.description && (
              <p className="text-sm text-gray-600 mb-2">{collab.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {format(collab.createdAt, 'dd/MM/yy')}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleEditCollaboration(collab)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Edit className="w-4 h-4 text-gray-500" />
              </button>
              {collab.isPaused ? (
                <button
                  onClick={() => handleReactivateCollaboration(collab.id)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title="Reactivar colaboración"
                >
                  <Play className="w-4 h-4 text-green-500" />
                </button>
              ) : (
                <button
                  onClick={() => handlePauseCollaboration(collab.id)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title="Pausar colaboración"
                >
                  <Pause className="w-4 h-4 text-yellow-500" />
                </button>
              )}
              <button
                onClick={() => handleDeleteCollaboration(collab.id)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{collab.locations.map(getLocationName).join(', ')}</span>
          </div>

          {/* Companions */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{collab.companionCount} acompañantes máx.</span>
          </div>

          {/* Date Range */}
          {collab.dateRange && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDateRange(collab.dateRange)}</span>
            </div>
          )}

          {/* Discount */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Percent className="w-4 h-4" />
            <span>
              {collab.discount.value}{collab.discount.type === 'percentage' ? '%' : '€'} Descuento
            </span>
          </div>

          {/* Available Days */}
          {collab.availableDays.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{collab.availableDays.join(', ').toLowerCase()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white pb-24 overflow-y-auto">
      <div className="w-full mx-auto md:max-w-4xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">COLABORACIONES</h1>
            <Search className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <div className="px-4 py-6">
          {collaborations.length === 0 ? (
            /* Empty State */
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Mis Colaboraciones (0)</h2>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    <p className="text-sm">No has creado ninguna</p>
                    <p className="text-sm">colaboración todavía</p>
                  </div>
                  <button 
                    onClick={() => navigate('/collaborations/create')}
                    className="text-blue-600 text-sm font-medium"
                  >
                    + Crear colaboración
                  </button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* Active Collaborations Section */}
              {activeCollaborations.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Colaboraciones Activas ({activeCollaborations.length})
                  </h2>
                  <div className="space-y-4">
                    {activeCollaborations.map(renderCollaborationCard)}
                  </div>
                </div>
              )}

              {/* Paused Collaborations Section */}
              {pausedCollaborations.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Colaboraciones Pausadas ({pausedCollaborations.length})
                  </h2>
                  <div className="space-y-4">
                    {pausedCollaborations.map(renderCollaborationCard)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Fixed Create Collaboration Button */}
      <div className="fixed bottom-6 left-4 right-4 z-20 md:max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate('/collaborations/create')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-base font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Crear colaboración
        </Button>
      </div>
    </div>
  );
};

export default CollaborationsPage;
