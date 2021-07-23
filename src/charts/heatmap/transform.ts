import { HeatmapChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

export type PartialHeatmapChartSettings = Omit<HeatmapChartSettings, 'theme'>;

const transform: WidgetTransform<PartialHeatmapChartSettings> = {
  serializeIn: (settings) => {
    const { tooltipSettings, layout } = settings;
    return {
      layout,
      formatValue:
        tooltipSettings && typeof tooltipSettings.formatValue === 'string'
          ? tooltipSettings.formatValue
          : null,
    };
  },
  serializeOut: ({ formatValue, layout }) => {
    return {
      layout,
      tooltipSettings: {
        formatValue,
      },
    };
  },
};

export default transform;
