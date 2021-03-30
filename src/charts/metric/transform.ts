import { MetricChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

const transform: WidgetTransform<MetricChartSettings> = {
  serializeIn: (settings) => {
    const { formatValue } = settings;

    return {
      formatValue: typeof formatValue === 'string' ? formatValue : null,
    };
  },
  serializeOut: ({ formatValue }) => {
    return {
      formatValue,
    };
  },
};

export default transform;
