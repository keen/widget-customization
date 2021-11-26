import { PickerWidgets } from '@keen.io/widget-picker';
import {
  GaugeChartSettings,
  PieChartSettings,
  TableChartSettings,
} from '@keen.io/charts';

import chartTransformations from '../charts';
import { createWidgetSettings } from '../utils';

import { SerializedSettings } from '../types';

import { PartialBarChartSettings } from '../charts/bar/transform';
import { PartialLineChartSettings } from '../charts/line/transform';
import { PartialHeatmapChartSettings } from '../charts/heatmap/transform';
import { PartialFunnelChartSettings } from '../charts/funnel/transform';
import { PartialChoroplethChartSettings } from '../charts/choropleth/transform';
import { PartialMetricChartSettings } from '../charts/metric/transform';
import { AvailableIcons } from '../constants';

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
  let settings = null;

  switch (widgetType) {
    case 'heatmap':
      settings = {
        chart: chartTransformations.heatmap.serializeIn(
          chartSettings as PartialHeatmapChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'choropleth':
      settings = {
        chart: chartTransformations.choropleth.serializeIn(
          chartSettings as PartialChoroplethChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'donut':
    case 'pie':
      settings = {
        chart: chartTransformations.circular.serializeIn(
          chartSettings as PieChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'funnel':
      settings = {
        chart: chartTransformations.funnel.serializeIn(
          chartSettings as PartialFunnelChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'metric':
      settings = {
        chart: chartTransformations.metric.serializeIn(
          chartSettings as PartialMetricChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'line':
    case 'area':
      settings = {
        chart: chartTransformations.line.serializeIn(
          chartSettings as PartialLineChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'bar':
      settings = {
        chart: chartTransformations.bar.serializeIn(
          chartSettings as PartialBarChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'table':
      settings = {
        chart: chartTransformations.table.serializeIn(
          chartSettings as TableChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    case 'gauge':
      settings = {
        chart: chartTransformations.gauge.serializeIn(
          chartSettings as GaugeChartSettings
        ),
        widget: createWidgetSettings(widgetSettings),
      };
      break;
    default:
      settings = {
        chart: {
          formatValue: null,
          funnelPercentages: chartSettings.theme.funnel.header.badge.enabled,
          verticalGrid: chartSettings.theme.gridX.enabled,
          horizontalGrid: chartSettings.theme.gridY.enabled,
          valueMode: chartSettings.valueMode,
        },
        widget: createWidgetSettings(widgetSettings),
      };
  }
  return {
    chart: {
      formatTableColumns: {},
      columnsNamesMapping: {},
      iconEnabled: false,
      iconStyle: 'solid',
      iconType: AvailableIcons[0],
      ...settings.chart,
    },
    widget: settings.widget,
  };
};

export default serializeInputSettings;
