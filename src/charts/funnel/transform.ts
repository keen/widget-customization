import { FunnelChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

const transform: WidgetTransform<FunnelChartSettings> = {
  serializeIn: (settings) => {
    const { formatValues } = settings;

    return {
      formatValue: typeof formatValues === 'string' ? formatValues : null,
    };
  },
  serializeOut: ({ formatValue }) => {
    return {
      formatValues: formatValue,
    };
  },
};

export default transform;
