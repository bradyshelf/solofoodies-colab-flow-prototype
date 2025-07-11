
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Trash2 } from 'lucide-react';

interface DeleteCollaborationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCollaborationDialog = ({ isOpen, onClose, onConfirm }: DeleteCollaborationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Eliminar colaboración</h2>
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
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Question */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Eliminar esta colaboración?
            </h3>
          </div>

          {/* Explanation Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Esta acción no se puede deshacer</li>
              <li>• Se eliminará permanentemente la colaboración</li>
              <li>• Se perderán todos los datos y solicitudes relacionadas</li>
              <li>• Los foodies que tenían esta colaboración guardada ya no podrán acceder a ella</li>
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
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              Eliminar permanentemente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollaborationDialog;
