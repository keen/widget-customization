import React, { FC, useContext } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';
import { MousePositionedTooltip } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import {
  BarSettings,
  LineSettings,
  FunnelSettings,
  ChoroplethSettings,
  TableSettings,
  MetricSettings,
  HeatmapSettings,
  GaugeSettings,
  CircularSettings,
  ComponentSettingsNotAvailable,
} from './components';

import {
  ChartCustomizationSettings,
  ComponentSettings,
  WidgetCustomizationSettings,
} from '../../types';

import SettingsContainer from '../SettingsContainer';

import { AppContext } from '../../contexts';

type Props = {
  /** Widget type */
  widgetType?: PickerWidgets;
  /** Chart customization settings */
  chartSettings: ChartCustomizationSettings;
  /** Widget customization settings */
  widgetSettings: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
  /** Component settings configuration */
  componentSettingsConfig: ComponentSettings;
  /** Chart result */
  result?: unknown;
};

const getSettingsComponent = (widgetType: PickerWidgets | 'gauge') => {
  switch (widgetType) {
    case 'table':
      return TableSettings;
    case 'metric':
      return MetricSettings;
    case 'bar':
      return BarSettings;
    case 'line':
    case 'area':
      return LineSettings;
    case 'heatmap':
      return HeatmapSettings;
    case 'funnel':
      return FunnelSettings;
    case 'pie':
    case 'donut':
      return CircularSettings;
    case 'choropleth':
      return ChoroplethSettings;
    case 'gauge':
      return GaugeSettings;
    default:
      return null;
  }
};

const ComponentSettings: FC<Props> = ({
  widgetType,
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  componentSettingsConfig,
  result,
}) => {
  const { modalContainer } = useContext(AppContext);
  const { isDisabled } = componentSettingsConfig;

  const { hiddenOptions } = componentSettingsConfig;

  const settingsComponent = getSettingsComponent(widgetType);

  const settingsAreAvailable = widgetType !== 'json';

  return settingsComponent && settingsAreAvailable ? (
    <MousePositionedTooltip
      isActive={!!isDisabled}
      tooltipPortal={modalContainer}
      tooltipTheme="dark"
      renderContent={() => (
        <BodyText variant="body2" color={colors.white[500]}>
          {isDisabled}
        </BodyText>
      )}
    >
      <SettingsContainer isDisabled={!!isDisabled}>
        {React.createElement(settingsComponent, {
          chartSettings,
          widgetSettings,
          onUpdateWidgetSettings,
          onUpdateChartSettings,
          hiddenOptions,
          result,
        })}
      </SettingsContainer>
    </MousePositionedTooltip>
  ) : (
    <ComponentSettingsNotAvailable widgetType={widgetType} />
  );
};

export default ComponentSettings;
