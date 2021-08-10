import { PieChartSettings, DonutChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

const transform: WidgetTransform<PieChartSettings & DonutChartSettings> = {
  serializeIn: (settings) => {
    return {
      formatValue:
        typeof settings?.tooltipSettings?.formatValue === 'string'
          ? settings.tooltipSettings.formatValue
          : null,
      valueMode: settings.valueMode,
    };
  },
  serializeOut: ({ formatValue, valueMode }) => {
    return {
      tooltipSettings: {
        formatValue,
      },
      valueMode,
    };
  },
};

export default transform;
