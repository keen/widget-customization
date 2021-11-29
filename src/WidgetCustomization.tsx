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
import { MENU_ITEMS_ENUM } from './constants';

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
  onMenuItemChange?: (menuItemId: MENU_ITEMS_ENUM) => void;
  /** Active menu item **/
  activeMenuItem?: MENU_ITEMS_ENUM;
  /** Analysis result */
  analysisResult?: unknown;
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
  activeMenuItem,
  analysisResult,
}) => {
  return (
    <AppContext.Provider value={{ modalContainer, pubSub }}>
      <App
        chart={chartSettings}
        widget={widgetSettings}
        widgetType={widgetType}
        savedQueryName={savedQueryName}
        customizationSections={customizationSections}
        analysisResult={analysisResult}
        onMenuItemChange={onMenuItemChange}
        activeMenuItem={activeMenuItem}
        onUpdateChartSettings={(settings) => {
          onUpdateChartSettings(settings);
        }}
        onUpdateWidgetSettings={onUpdateWidgetSettings}
      />
    </AppContext.Provider>
  );
};

export default WidgetCustomization;
