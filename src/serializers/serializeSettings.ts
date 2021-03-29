import { PickerWidgets } from '@keen.io/widget-picker';
import {
  BarChartSettings,
  LineChartSettings,
  MetricChartSettings,
  FunnelChartSettings,
  PieChartSettings,
  ChoroplethChartSettings,
  HeatmapChartSettings,
} from '@keen.io/charts';

import chartTransformations from '../charts';

import { CustomizationSettings } from '../types';

/**
 * Translate chart settings interface to widget customization settings
 *
 * @param widgetType - type of widget
 * @param chartSettings - chart settings
 * @return transformed interface
 *
 */
const serializeSettings = (
  widgetType: PickerWidgets,
  chartSettings: Record<string, any>
): CustomizationSettings => {
  switch (widgetType) {
    case 'heatmap':
      return chartTransformations.heatmap.serializeIn(
        chartSettings as HeatmapChartSettings
      );
    case 'choropleth':
      return chartTransformations.choropleth.serializeIn(
        chartSettings as ChoroplethChartSettings
      );
    case 'donut':
    case 'pie':
      return chartTransformations.circular.serializeIn(
        chartSettings as PieChartSettings
      );
    case 'funnel':
      return chartTransformations.funnel.serializeIn(
        chartSettings as FunnelChartSettings
      );
    case 'metric':
      return chartTransformations.metric.serializeIn(
        chartSettings as MetricChartSettings
      );
    case 'line':
    case 'area':
      return chartTransformations.line.serializeIn(
        chartSettings as LineChartSettings
      );
    case 'bar':
      return chartTransformations.bar.serializeIn(
        chartSettings as BarChartSettings
      );
    default:
      return {
        formatValue: null,
      };
  }
};

export default serializeSettings;
