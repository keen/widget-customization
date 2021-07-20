import { PickerWidgets } from '@keen.io/widget-picker';
import {
  LineChartSettings,
  MetricChartSettings,
  FunnelChartSettings,
  PieChartSettings,
  ChoroplethChartSettings,
  HeatmapChartSettings,
} from '@keen.io/charts';

import chartTransformations from '../charts';
import { createWidgetSettings } from '../utils';

import { SerializedSettings } from '../types';
import { PartialBarChartSettings } from '../charts/bar/transform';

/**
 * Translate chart settings interface to widget customization settings
 *
 * @param widgetType - type of widget
 * @param chartSettings - chart settings
 * @return transformed interface
 *
 */
const serializeInputSettings = (
  widgetType: PickerWidgets,
  chartSettings: Record<string, any>,
  widgetSettings: Record<string, any>
): SerializedSettings => {
  switch (widgetType) {
    case 'heatmap':
      return {
        chart: chartTransformations.heatmap.serializeIn(
          chartSettings as HeatmapChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    case 'choropleth':
      return {
        chart: chartTransformations.choropleth.serializeIn(
          chartSettings as ChoroplethChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    case 'donut':
    case 'pie':
      return {
        chart: chartTransformations.circular.serializeIn(
          chartSettings as PieChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    case 'funnel':
      return {
        chart: chartTransformations.funnel.serializeIn(
          chartSettings as FunnelChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    case 'metric':
      return {
        chart: chartTransformations.metric.serializeIn(
          chartSettings as MetricChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    case 'line':
    case 'area':
      return {
        chart: chartTransformations.line.serializeIn(
          chartSettings as LineChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    case 'bar':
      return {
        chart: chartTransformations.bar.serializeIn(
          chartSettings as PartialBarChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
    default:
      return {
        chart: {
          formatValue: null,
          verticalGrid: chartSettings.theme.gridX.enabled,
          horizontalGrid: chartSettings.theme.gridY.enabled,
        },
        widget: createWidgetSettings(widgetSettings),
      };
  }
};

export default serializeInputSettings;
