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
  return <div className="w-full">
      <Card className="lg:sticky lg:top-20">
        <CardContent className="p-4 px-[15px]">
          <h3 className="font-semibold text-gray-900 mb-4 text-base">Vista previa</h3>
          <div className="bg-gray-900 rounded-lg p-5 text-white space-y-3 py-[29px]">
            <div className="flex items-center space-x-2">
              {collaborationType === 'public' ? <Globe className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-blue-400" />}
              <span className="text-sm font-medium">
                {collaborationType === 'public' ? 'Pública' : 'Por invitación'}
              </span>
            </div>

            {selectedLocations.length > 0 && <div className="space-y-2">
                {selectedLocations.slice(0, 2).map(locationId => {
              const location = locations.find(loc => loc.id === locationId);
              return location ? <div key={locationId} className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">{location.name}</div>
                        <div className="text-gray-400 text-sm">{location.address}</div>
                      </div>
                    </div> : null;
            })}
                {selectedLocations.length > 2 && <div className="text-sm text-gray-400 ml-6">
                    +{selectedLocations.length - 2} más
                  </div>}
              </div>}

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm">{companionCount} acompañantes máx.</span>
            </div>

            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-orange-400" />
              <span className="text-sm">Mín. {formatFollowerCount(minFollowerCount)} seguidores</span>
            </div>

            <div className="flex items-center space-x-2">
              <Percent className="w-4 h-4 text-orange-400" />
              <span className="text-sm">{discountValue}{discountType === 'percentage' ? '%' : '€'} Descuento</span>
            </div>

            {selectedDays.length > 0 && <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm">
                  {selectedDays.length > 3 ? `${selectedDays.slice(0, 2).join(', ').toLowerCase()}, +${selectedDays.length - 2} más` : selectedDays.join(', ').toLowerCase()}
                </span>
              </div>}
          </div>

          <Button onClick={onCreateCollaboration} disabled={!isFormValid} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 text-sm">
            <Check className="w-4 h-4" />
            <span>{getButtonText()}</span>
          </Button>
        </CardContent>
      </Card>
    </div>;
};
export default CollaborationPreview;