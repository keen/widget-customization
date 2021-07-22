import { FunnelChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

export type PartialFunnelChartSettings = Omit<FunnelChartSettings, 'theme'> & {
  theme: {
    funnel: {
      header: {
        badge: {
          enabled: boolean;
        };
      };
    };
  };
};

const transform: WidgetTransform<PartialFunnelChartSettings> = {
  serializeIn: (settings) => {
    const { formatValues, theme } = settings;

    return {
      funnelPercentages: theme.funnel.header.badge.enabled,
      formatValue: typeof formatValues === 'string' ? formatValues : null,
    };
  },
  serializeOut: ({ formatValue, funnelPercentages }) => {
    return {
      formatValues: formatValue,
      theme: {
        funnel: {
          header: {
            badge: {
              enabled: funnelPercentages,
            },
          },
        },
      },
    };
  },
};

export default transform;
