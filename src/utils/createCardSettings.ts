import { widgetSettings } from '@keen.io/widgets';

/**
 * Creates basic settings for card
 *
 * @return default card settings
 *
 */
const createCardSettings = () => {
  const {
    card: { enabled },
  } = widgetSettings;

  return {
    card: { enabled },
  };
};

export default createCardSettings;
