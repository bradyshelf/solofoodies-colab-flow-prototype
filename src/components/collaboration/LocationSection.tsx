
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Check } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationSectionProps {
  selectedLocations: string[];
  locations: Location[];
  onLocationToggle: (locationId: string) => void;
}

const LocationSection = ({ selectedLocations, locations, onLocationToggle }: LocationSectionProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Ubicación ({selectedLocations.length})</h3>
        </div>
        <div className="space-y-3">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => onLocationToggle(location.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center space-x-3 ${
                selectedLocations.includes(location.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedLocations.includes(location.id)
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedLocations.includes(location.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{location.name}</div>
                <div className="text-sm text-gray-500">{location.address}</div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSection;
