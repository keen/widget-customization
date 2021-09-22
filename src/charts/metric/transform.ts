import { MetricChartSettings } from '@keen.io/charts';
import { IconType } from '@keen.io/icons';

import { WidgetTransform } from '../../types';
import { IconStyles } from '../../constants';

export type PartialMetricChartSettings = Omit<MetricChartSettings, 'theme'> & {
  theme: {
    metric: {
      icon: {
        enabled: boolean;
        style: IconStyles;
        type: IconType;
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
  serializeOut: ({
    formatValue,
    iconEnabled,
    iconStyle,
    iconType,
  }: {
    formatValue: string;
    iconType: IconType;
    iconEnabled: boolean;
    iconStyle: IconStyles;
  }) => {
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
