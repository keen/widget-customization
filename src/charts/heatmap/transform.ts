import { HeatmapChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

const transform: WidgetTransform<HeatmapChartSettings> = {
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
