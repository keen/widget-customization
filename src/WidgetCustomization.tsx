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
  /** PubSub used to communicate with chart */
  pubSub?: PubSub;
  /** Callback which will be called on menu section change */
  onMenuItemChange?: (menuItemId: string) => void;
  /** Result of query */
  result?: unknown;
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
  onMenuItemChange,
  result,
}) => {
  return (
    <AppContext.Provider value={{ modalContainer, pubSub }}>
      <App
        chart={chartSettings}
        widget={widgetSettings}
        widgetType={widgetType}
        savedQueryName={savedQueryName}
        customizationSections={customizationSections}
        result={result}
        onMenuItemChange={onMenuItemChange}
        onUpdateChartSettings={(settings) => {
          onUpdateChartSettings(settings);
        }}
        onUpdateWidgetSettings={onUpdateWidgetSettings}
      />
    </AppContext.Provider>
  );
};

export default WidgetCustomization;
