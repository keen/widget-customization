import { HeatmapChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

export type PartialHeatmapChartSettings = Omit<HeatmapChartSettings, 'theme'>;

const transform: WidgetTransform<PartialHeatmapChartSettings> = {
  serializeIn: (settings) => {
    const { tooltipSettings, layout } = settings;
    return {
      layout,
      xAxisTitle: settings.xAxisTitle,
      yAxisTitle: settings.yAxisTitle,
      formatValue:
        tooltipSettings && typeof tooltipSettings.formatValue === 'string'
          ? tooltipSettings.formatValue
          : null,
    };
  },
  serializeOut: ({ formatValue, xAxisTitle, yAxisTitle, layout }) => {
    return {
      xAxisTitle,
      yAxisTitle,
      layout,
      tooltipSettings: {
        formatValue,
      },
    };
  },
};

export default transform;
