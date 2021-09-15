import { MetricChartSettings } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

export type PartialMetricChartSettings = Omit<MetricChartSettings, 'theme'> & {
  theme: {
    metric: {
      icon: {
        enabled: boolean;
        style: string;
        type: string;
      };
    };
  };
};
const transform: WidgetTransform<PartialMetricChartSettings> = {
  serializeIn: (settings) => {
    const { formatValue, theme } = settings;
    const icon = theme?.metric?.icon;

    return {
      formatValue: typeof formatValue === 'string' ? formatValue : null,
      iconEnabled: icon?.enabled,
      iconStyle: icon?.style,
      iconType: icon?.type,
    };
  },
  serializeOut: ({ formatValue, iconEnabled, iconStyle, iconType }) => {
    return {
      formatValue,
      theme: {
        metric: {
          icon: {
            enabled: iconEnabled,
            style: iconStyle,
            type: iconType,
          },
        },
      },
    };
  },
};

export default transform;
