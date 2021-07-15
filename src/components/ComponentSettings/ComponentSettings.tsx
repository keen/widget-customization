import React, { FC } from 'react';
import { BarSettings } from './components';
import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from '../../types';

type Props = {
  /** Chart customization settings */
  chartSettings: ChartCustomizationSettings;
  /** Widget customization settings */
  widgetSettings: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
};

const ComponentSettings: FC<Props> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
}) => {
  return (
    <BarSettings
      chartSettings={chartSettings}
      widgetSettings={widgetSettings}
      onUpdateWidgetSettings={onUpdateWidgetSettings}
      onUpdateChartSettings={onUpdateChartSettings}
    />
  );
};

export default ComponentSettings;
