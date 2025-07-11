
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Pause } from 'lucide-react';

interface PauseCollaborationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PauseCollaborationDialog = ({ isOpen, onClose, onConfirm }: PauseCollaborationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pausar colaboración</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6 text-center">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <Pause className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Question */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Pausar esta colaboración?
            </h3>
          </div>

          {/* Explanation Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Los foodies no podrán ver esta colaboración en su página de explorar</li>
              <li>• No se recibirán más solicitudes de participación</li>
              <li>• La colaboración se puede reactivar en cualquier momento</li>
              <li>• Es diferente a eliminar porque se conservan todos los datos</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Pausar colaboración
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PauseCollaborationDialog;
