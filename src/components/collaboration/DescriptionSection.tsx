

import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface DescriptionSectionProps {
  description: string;
  onDescriptionChange: (description: string) => void;
}

const DescriptionSection = ({ description, onDescriptionChange }: DescriptionSectionProps) => {
  const maxLength = 800;
  const remainingChars = maxLength - description.length;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Descripción</h3>
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Describe lo que espera de esta colaboración
          </Label>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe lo que espera de esta colaboración"
            className="min-h-[120px] resize-none"
            maxLength={maxLength}
          />
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              {remainingChars}/{maxLength}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionSection;

