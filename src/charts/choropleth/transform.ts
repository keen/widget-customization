import { ChoroplethChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

export type PartialChoroplethChartSettings = Omit<
  ChoroplethChartSettings,
  'theme'
>;

const transform: WidgetTransform<PartialChoroplethChartSettings> = {
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
