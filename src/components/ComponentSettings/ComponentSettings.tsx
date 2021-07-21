import React, { FC } from 'react';
import { BarSettings } from './components';
import {
  ChartCustomizationSettings,
  ComponentSettings,
  WidgetCustomizationSettings,
} from '../../types';
import { BodyText } from '@keen.io/typography';

type Props = {
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

const ComponentSettings: FC<Props> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  componentSettingsConfig,
}) => {
  return componentSettingsConfig.isDisabled ? (
    <BodyText variant="body1">{componentSettingsConfig.isDisabled}</BodyText>
  ) : (
    <BarSettings
      chartSettings={chartSettings}
      widgetSettings={widgetSettings}
      onUpdateWidgetSettings={onUpdateWidgetSettings}
      onUpdateChartSettings={onUpdateChartSettings}
      hiddenOptions={componentSettingsConfig?.hiddenOptions}
    />
  );
};

export default ComponentSettings;
