import {
  ChartCustomizationSettings,
  HiddenOptions,
  WidgetCustomizationSettings,
} from '../../../types';

export type SettingsModifier = {
  /** Chart customization settings */
  chartSettings: ChartCustomizationSettings;
  /** Widget customization settings */
  widgetSettings: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
  /** Component settings configuration */
  hiddenOptions: HiddenOptions;
};
