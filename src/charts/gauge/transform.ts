import { GaugeChartSettings } from '@keen.io/charts';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<GaugeChartSettings> = {
  serializeIn: (settings) => {
    const { minValue, maxValue } = settings;

    return {
      minValue,
      maxValue,
    };
  },
  serializeOut: ({ minValue, maxValue }) => {
    return {
      minValue,
      maxValue,
    };
  },
};

export default transform;
