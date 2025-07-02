import { Card, CardContent } from '@/components/ui/card';
import { Globe, Lock } from 'lucide-react';
interface CollaborationTypeSectionProps {
  collaborationType: 'public' | 'private';
  onCollaborationTypeChange: (type: 'public' | 'private') => void;
}
const CollaborationTypeSection = ({
  collaborationType,
  onCollaborationTypeChange
}: CollaborationTypeSectionProps) => {
  return <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Tipo de Colaboración</h3>
        
        <div className="space-y-11">
          {/* Public Option */}
          <div onClick={() => onCollaborationTypeChange('public')} className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${collaborationType === 'public' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className={`w-5 h-5 ${collaborationType === 'public' ? 'text-green-600' : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium text-gray-900">Pública</div>
                  <div className="text-sm text-gray-500">Define las condiciones y recibe solicitudes de foodies</div>
                </div>
              </div>
              {collaborationType === 'public' && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>
          </div>

          {/* Private Option */}
          <div onClick={() => onCollaborationTypeChange('private')} className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${collaborationType === 'private' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className={`w-5 h-5 ${collaborationType === 'private' ? 'text-blue-600' : 'text-gray-400'}`} />
                <div>
                  <div className="font-medium text-gray-900">Por invitación</div>
                  <div className="text-sm text-gray-500">Define las condiciones y elige los foodies con los que quieres colaborar</div>
                </div>
              </div>
              {collaborationType === 'private' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default CollaborationTypeSection;