
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Lock, MapPin, Users, Percent, Clock, Check, UserCheck } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
}

interface CollaborationPreviewProps {
  collaborationType: 'public' | 'private';
  selectedLocations: string[];
  locations: Location[];
  companionCount: number;
  minFollowerCount: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  selectedDays: string[];
  isFormValid: boolean;
  onCreateCollaboration: () => void;
  isEditMode?: boolean;
}

const CollaborationPreview = ({
  collaborationType,
  selectedLocations,
  locations,
  companionCount,
  minFollowerCount,
  discountType,
  discountValue,
  selectedDays,
  isFormValid,
  onCreateCollaboration,
  isEditMode = false
}: CollaborationPreviewProps) => {
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }
    return count.toString();
  };

  const getButtonText = () => {
    if (isEditMode) {
      return 'Actualizar colaboración';
    }
    return collaborationType === 'private' ? 'Invitar Foodies' : 'Crear colaboración';
  };

  return (
    <div className="w-full lg:w-80">
      <Card className="sticky top-24">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Vista previa</h3>
          <div className="bg-gray-900 rounded-xl p-4 text-white space-y-3">
            <div className="flex items-center space-x-2">
              {collaborationType === 'public' ? 
                <Globe className="w-4 h-4 text-green-400" /> : 
                <Lock className="w-4 h-4 text-blue-400" />
              }
              <span className="text-sm font-medium">
                {collaborationType === 'public' ? 'Pública' : 'Por invitación'}
              </span>
            </div>

            {selectedLocations.length > 0 && (
              <div className="space-y-2">
                {selectedLocations.map(locationId => {
                  const location = locations.find(loc => loc.id === locationId);
                  return location ? (
                    <div key={locationId} className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      <div className="text-sm">
                        <div className="font-medium">{location.name}</div>
                        <div className="text-gray-400 text-xs">{location.address}</div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm">{companionCount} acompañantes máx. por foodie</span>
            </div>

            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-orange-400" />
              <span className="text-sm">Mín. {formatFollowerCount(minFollowerCount)} seguidores</span>
            </div>

            <div className="flex items-center space-x-2">
              <Percent className="w-4 h-4 text-orange-400" />
              <span className="text-sm">{discountValue}{discountType === 'percentage' ? '%' : '€'} Descuento</span>
            </div>

            {selectedDays.length > 0 && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm">{selectedDays.join(', ').toLowerCase()}</span>
              </div>
            )}
          </div>

          <Button
            onClick={onCreateCollaboration}
            disabled={!isFormValid}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium flex items-center justify-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>{getButtonText()}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationPreview;
