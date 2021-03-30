import { PickerWidgets } from '@keen.io/widget-picker';

import chartTransformations from '../charts';

import { ChartCustomizationSettings } from '../types';

/**
 * Translate customization settings to widget interface
 *
 * @param widgetType - type of widget
 * @param chartSettings - chart settings
 * @return transformed interface
 *
 */
const serializeOutputSettings = (
  widgetType: PickerWidgets,
  chartSettings: ChartCustomizationSettings
): Record<string, any> => {
  switch (widgetType) {
    case 'heatmap':
      return  chartTransformations.heatmap.serializeOut(chartSettings);
    case 'choropleth':
      return  chartTransformations.choropleth.serializeOut(chartSettings);
    case 'donut':
    case 'pie':
      return  chartTransformations.circular.serializeOut(chartSettings);
    case 'funnel':
      return  chartTransformations.funnel.serializeOut(chartSettings);
    case 'metric':
      return  chartTransformations.metric.serializeOut(chartSettings);
    case 'line':
    case 'area':
        return  chartTransformations.line.serializeOut(chartSettings);
    case 'bar':
      return  chartTransformations.bar.serializeOut(chartSettings);
    default:
      return {};
  }
};

export default serializeOutputSettings;
