import { LineChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

const transform: WidgetTransform<LineChartSettings> = {
  serializeIn: (settings) => {
    const { yScaleSettings } = settings;

    return {
      formatValue:
        typeof yScaleSettings?.formatLabel === 'string'
          ? yScaleSettings.formatLabel
          : null,
    };
  },
  serializeOut: ({ formatValue }) => {
    return {
      yScaleSettings: {
        type: 'linear',
        formatLabel: formatValue,
      },
      tooltipSettings: {
        formatValue,
      },
    };
  },
};

export default transform;
