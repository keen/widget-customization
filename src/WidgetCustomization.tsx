import React, { FC } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';

import App from './components/App';

import { serializeInputSettings, serializeOutputSettings } from './serializers';

type Props = {
  /** Widget type*/
  widgetType: PickerWidgets;
  /** Chart plot settings */
  chartSettings?: Record<string, any>;
  /** Widget component settings */
  widgetSettings?: Record<string, any>;
  onUpdateChartSettings: (settings: Record<string, any>) => void;
  onUpdateWidgetSettings: (settings: Record<string, any>) => void;
};

const WidgetCustomization: FC<Props> = ({
  widgetType,
  chartSettings = {},
  widgetSettings = {},
  onUpdateWidgetSettings,
  onUpdateChartSettings,
}) => {
  const { chart, widget } = serializeInputSettings(
    widgetType,
    chartSettings,
    widgetSettings
  );

  return (
    <div>
      <App
        widgetType={widgetType}
        chart={chart}
        widget={widget}
        onUpdateChartSettings={(settings) => {
          const serializedSettings = serializeOutputSettings(
            widgetType,
            settings
          );
          onUpdateChartSettings(serializedSettings);
        }}
        onUpdateWidgetSettings={onUpdateWidgetSettings}
      />
    </div>
  );
};

export default WidgetCustomization;
