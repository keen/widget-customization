import { PickerWidgets } from '@keen.io/widget-picker';
import { widgetSettings, choroplethWidgetSettings } from '@keen.io/widgets';

/**
 * Creates basic settings for legend
 * @param widgetType - visualization type
 *
 * @return default legend settings
 *
 */
const createLegendSettings = (widgetType?: PickerWidgets) => {
  const settings =
    widgetType === 'choropleth' ? choroplethWidgetSettings : widgetSettings;
  const {
    legend: { enabled, position, alignment, layout },
  } = settings;

  return {
    legend: {
      enabled,
      position,
      alignment,
      layout,
    },
  };
};

export default createLegendSettings;
