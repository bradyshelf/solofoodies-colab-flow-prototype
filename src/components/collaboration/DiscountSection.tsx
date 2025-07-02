import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Percent } from 'lucide-react';
interface DiscountSectionProps {
  discountType: 'percentage' | 'fixed';
  discountValue: number[];
  onDiscountTypeChange: (type: 'percentage' | 'fixed') => void;
  onDiscountValueChange: (value: number[]) => void;
}
const DiscountSection = ({
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange
}: DiscountSectionProps) => {
  return <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <Percent className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Descuento</h3>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => onDiscountTypeChange('percentage')} className={`px-3 py-2 rounded-lg text-sm font-medium ${discountType === 'percentage' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            Porcentaje
          </button>
          <button onClick={() => onDiscountTypeChange('fixed')} className={`px-3 py-2 rounded-lg text-sm font-medium ${discountType === 'fixed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            Cantidad fija
          </button>
        </div>
        
        <div className="space-y-11">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {discountValue[0]}{discountType === 'percentage' ? '%' : '€'}
            </div>
          </div>
          <Slider value={discountValue} onValueChange={onDiscountValueChange} max={discountType === 'percentage' ? 100 : 200} min={discountType === 'percentage' ? 5 : 10} step={discountType === 'percentage' ? 5 : 5} className="w-full" />
        </div>
      </CardContent>
    </Card>;
};
export default DiscountSection;