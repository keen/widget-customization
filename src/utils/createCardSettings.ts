import { widgetSettings } from '@keen.io/widgets';

/**
 * Creates basic settings for card
 *
 * @return default card settings
 *
 */
const createCardSettings = () => {
  const {
    card: { enabled, backgroundColor, borderRadius, hasShadow },
  } = widgetSettings;

  return {
    legend: {
      enabled,
      backgroundColor,
      borderRadius,
      hasShadow,
    },
  };
};

export default createCardSettings;
