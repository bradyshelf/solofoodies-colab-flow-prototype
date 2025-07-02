
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Lock } from 'lucide-react';

interface CollaborationTypeSectionProps {
  collaborationType: 'public' | 'private';
  onCollaborationTypeChange: (type: 'public' | 'private') => void;
}

const CollaborationTypeSection = ({ 
  collaborationType, 
  onCollaborationTypeChange 
}: CollaborationTypeSectionProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Tipo de Colaboración</h3>
          <div className="text-2xl">
            {collaborationType === 'public' ? 
              <Globe className="w-5 h-5 text-green-600" /> : 
              <Lock className="w-5 h-5 text-blue-600" />
            }
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Switch
            checked={collaborationType === 'private'}
            onCheckedChange={(checked) => onCollaborationTypeChange(checked ? 'private' : 'public')}
          />
          <Label className="text-sm">
            {collaborationType === 'public' ? 'Pública (todos pueden aplicar)' : 'Por invitación (solo invitados)'}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationTypeSection;
