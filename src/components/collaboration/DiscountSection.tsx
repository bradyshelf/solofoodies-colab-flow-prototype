
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Percent, DollarSign } from 'lucide-react';

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
  const handleDiscountTypeChange = (type: 'percentage' | 'fixed') => {
    // If switching to percentage and current value is above 100, reset to 100
    if (type === 'percentage' && discountValue[0] > 100) {
      onDiscountValueChange([100]);
    }
    // If switching to fixed and current value is below 10, reset to 10
    else if (type === 'fixed' && discountValue[0] < 10) {
      onDiscountValueChange([10]);
    }
    onDiscountTypeChange(type);
  };
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center space-x-3 mb-3">
          {discountType === 'percentage' ? (
            <Percent className="w-5 h-5 text-orange-500" />
          ) : (
            <DollarSign className="w-5 h-5 text-orange-500" />
          )}
          <h3 className="font-semibold text-gray-900">Descuento</h3>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-3">
          <button 
            onClick={() => handleDiscountTypeChange('percentage')} 
            className={`p-3 rounded-lg text-sm font-medium flex items-center justify-center ${discountType === 'percentage' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Percent className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDiscountTypeChange('fixed')} 
            className={`p-3 rounded-lg text-sm font-medium flex items-center justify-center ${discountType === 'fixed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3 px-0 py-2">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {discountValue[0]}{discountType === 'percentage' ? '%' : '€'}
            </div>
          </div>
          <Slider value={discountValue} onValueChange={onDiscountValueChange} max={discountType === 'percentage' ? 100 : 200} min={discountType === 'percentage' ? 5 : 10} step={discountType === 'percentage' ? 5 : 5} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
export default DiscountSection;
