import { GaugeChartSettings } from '@keen.io/charts';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<GaugeChartSettings> = {
  serializeIn: ({ minValue, maxValue, formatValue }) => {
    return {
      formatValue: typeof formatValue === 'string' ? formatValue : null,
      minValue,
      maxValue,
    };
  },
  serializeOut: ({ minValue, maxValue, formatValue }) => {
    return {
      formatValue,
      minValue,
      maxValue,
    };
  },
};

export default transform;
