import { widgetSettings } from '@keen.io/widgets';

/**
 * Creates basic settings for legend
 *
 * @return default legend settings
 *
 */
const createLegendSettings = () => {
  const {
    legend: { enabled, position, alignment, layout },
  } = widgetSettings;

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
