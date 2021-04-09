import React, { FC } from 'react';

import App from './components/App';
import { AppContext } from './contexts';

import {
  SectionsConfiguration,
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from './types';

type Props = {
  /** Chart plot settings */
  chartSettings?: ChartCustomizationSettings;
  /** Widget component settings */
  widgetSettings?: WidgetCustomizationSettings;
  /** Update chart settings */
  onUpdateChartSettings: (settings: ChartCustomizationSettings) => void;
  /** Update widget settings */
  onUpdateWidgetSettings: (settings: WidgetCustomizationSettings) => void;
  /** Modal container element */
  modalContainer?: string;
  /** Customization sections configuration */
  customizationSections?: SectionsConfiguration;
};

const WidgetCustomization: FC<Props> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  modalContainer,
  customizationSections = {},
}) => {
  return (
    <AppContext.Provider value={{ modalContainer }}>
      <App
        chart={chartSettings}
        widget={widgetSettings}
        customizationSections={customizationSections}
        onUpdateChartSettings={(settings) => {
          onUpdateChartSettings(settings);
        }}
        onUpdateWidgetSettings={onUpdateWidgetSettings}
      />
    </AppContext.Provider>
  );
};

export default WidgetCustomization;
