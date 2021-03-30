import { ChoroplethChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

const transform: WidgetTransform<ChoroplethChartSettings> = {
  serializeIn: (settings) => {
    return {
      formatValue:
        typeof settings?.tooltipSettings?.formatValue === 'string'
          ? settings.tooltipSettings.formatValue
          : null,
    };
  },
  serializeOut: ({ formatValue }) => {
    return {
      tooltipSettings: {
        formatValue,
      },
    };
  },
};

export default transform;
