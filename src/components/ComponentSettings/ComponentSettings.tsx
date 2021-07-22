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
};

const getSettingsComponent = (widgetType: PickerWidgets) => {
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
    case 'choropleth':
      return ChoroplethSettings;
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
}) => {
  const { modalContainer } = useContext(AppContext);
  const { isDisabled } = componentSettingsConfig;

  const { hiddenOptions } = componentSettingsConfig;

  const settingsComponent = getSettingsComponent(widgetType);

  return (
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
        {settingsComponent
          ? React.createElement(getSettingsComponent(widgetType), {
              chartSettings,
              widgetSettings,
              onUpdateWidgetSettings,
              onUpdateChartSettings,
              hiddenOptions,
            })
          : null}
      </SettingsContainer>
    </MousePositionedTooltip>
  );
};

export default ComponentSettings;
