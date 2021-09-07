import React, { FC } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';
import { PubSub } from '@keen.io/pubsub';

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
  /** Connected save query name */
  savedQueryName?: string;
  /** Customization sections configuration */
  customizationSections?: SectionsConfiguration;
  /** Widget type */
  widgetType?: PickerWidgets;
  pubSub?: PubSub;
};

const WidgetCustomization: FC<Props> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  modalContainer,
  savedQueryName,
  widgetType,
  customizationSections = {},
  pubSub,
}) => {
  return (
    <AppContext.Provider value={{ modalContainer, pubSub }}>
      <App
        chart={chartSettings}
        widget={widgetSettings}
        widgetType={widgetType}
        savedQueryName={savedQueryName}
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
