import React, { FC, useState, useRef, useEffect } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';

import App from './components/App';
import { AppContext } from './contexts';

import { serializeInputSettings, serializeOutputSettings } from './serializers';

import { SectionsConfiguration } from './types';

type Props = {
  /** Widget type*/
  widgetType: PickerWidgets;
  /** Chart plot settings */
  chartSettings?: Record<string, any>;
  /** Widget component settings */
  widgetSettings?: Record<string, any>;
  /** Update chart settings */
  onUpdateChartSettings: (settings: Record<string, any>) => void;
  /** Update widget settings */
  onUpdateWidgetSettings: (settings: Record<string, any>) => void;
  /** Modal container element */
  modalContainer?: string;
  /** Customization sections configuration */
  customizationSections?: SectionsConfiguration;
};

const WidgetCustomization: FC<Props> = ({
  widgetType,
  chartSettings = {},
  widgetSettings = {},
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  modalContainer,
  customizationSections = {},
}) => {
  const widgetRef = useRef<PickerWidgets>(widgetType);
  const { chart, widget } = serializeInputSettings(
    widgetType,
    chartSettings,
    widgetSettings
  );

  const [serializedChartSettings, setSerializedChartSettings] = useState(chart);

  useEffect(() => {
    if (widgetRef.current !== widgetType) {
      const serializedSettings = serializeOutputSettings(
        widgetType,
        serializedChartSettings
      );
      onUpdateChartSettings(serializedSettings);
      widgetRef.current = widgetType;
    }
  }, [widgetType]);

  return (
    <AppContext.Provider value={{ modalContainer }}>
      <App
        widgetType={widgetType}
        chart={chart}
        widget={widget}
        customizationSections={customizationSections}
        onUpdateChartSettings={(settings) => {
          const serializedSettings = serializeOutputSettings(
            widgetType,
            settings
          );
          setSerializedChartSettings(settings);
          onUpdateChartSettings(serializedSettings);
        }}
        onUpdateWidgetSettings={onUpdateWidgetSettings}
      />
    </AppContext.Provider>
  );
};

export default WidgetCustomization;
