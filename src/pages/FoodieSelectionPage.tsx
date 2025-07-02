import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Foodie {
  id: string;
  username: string;
  name: string;
  avatar: string;
  followers: number;
  engagement: number;
  colabs: number;
  rating: number;
  reviewCount: number;
}

const FoodieSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoodies, setSelectedFoodies] = useState<string[]>([]);

  // Mock foodie data
  const foodies: Foodie[] = [
    {
      id: '1',
      username: '@id_usuario',
      name: 'Nombre Usuario',
      avatar: '/lovable-uploads/6a11c749-7a0c-4560-a2af-1eaccbddef27.png',
      followers: 13000,
      engagement: 2.15,
      colabs: 14,
      rating: 5.0,
      reviewCount: 5
    },
    {
      id: '2',
      username: '@id_usuario',
      name: 'Nombre Usuario',
      avatar: '/lovable-uploads/6a11c749-7a0c-4560-a2af-1eaccbddef27.png',
      followers: 13000,
      engagement: 2.15,
      colabs: 14,
      rating: 5.0,
      reviewCount: 5
    },
    {
      id: '3',
      username: '@id_usuario',
      name: 'Nombre Usuario',
      avatar: '/lovable-uploads/6a11c749-7a0c-4560-a2af-1eaccbddef27.png',
      followers: 13000,
      engagement: 2.15,
      colabs: 14,
      rating: 5.0,
      reviewCount: 5
    }
  ];

  const tabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'solicitudes', label: 'Solicitudes' },
    { id: 'favoritos', label: 'Favoritos' }
  ];

  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }
    return count.toString();
  };

  const handleInviteFoodie = (foodieId: string) => {
    setSelectedFoodies(prev => 
      prev.includes(foodieId) 
        ? prev.filter(id => id !== foodieId)
        : [...prev, foodieId]
    );
  };

  const handleSendInvitations = () => {
    // Here you would handle sending invitations to selected foodies
    console.log('Sending invitations to:', selectedFoodies);
    
    // Navigate back to collaborations with the created collaboration
    navigate('/collaborations', {
      state: {
        newCollaboration: true,
        collaborationType: location.state?.collaborationType,
        selectedLocations: location.state?.selectedLocations,
        companionCount: location.state?.companionCount,
        discount: location.state?.discount,
        availableDays: location.state?.availableDays,
        invitedFoodies: selectedFoodies
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center space-x-4 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Foodies seleccionados
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-red-600 border-red-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Busca foodies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Foodies List */}
        <div className="space-y-4">
          {foodies.map((foodie) => (
            <Card key={foodie.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={foodie.avatar}
                        alt={foodie.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Foodie Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="font-semibold text-gray-900">{foodie.username}</span>
                      </div>
                      <p className="text-sm text-gray-600">{foodie.name}</p>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-3 h-3 text-red-500">★</div>
                        ))}
                        <span className="text-xs text-gray-500">({foodie.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Invite Button */}
                  <Button
                    onClick={() => handleInviteFoodie(foodie.id)}
                    className={`px-6 py-2 rounded-full font-medium ${
                      selectedFoodies.includes(foodie.id)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {selectedFoodies.includes(foodie.id) ? 'Invitado' : 'Añadir'}
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{formatFollowerCount(foodie.followers)}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{foodie.engagement}%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{foodie.colabs}</div>
                    <div className="text-xs text-gray-500">Colabs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">0</div>
                    <div className="text-xs text-gray-500">Juntos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fixed Send Invitations Button */}
      {selectedFoodies.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-20">
          <Button 
            onClick={handleSendInvitations}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-base font-medium"
          >
            Enviar invitaciones ({selectedFoodies.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default FoodieSelectionPage;
