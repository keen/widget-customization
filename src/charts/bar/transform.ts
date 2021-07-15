import { BarChartSettings, Theme } from '@keen.io/charts';

import { WidgetTransform } from '../../types';
import { Grid } from '@keen.io/charts/dist/types';

type PartialTheme = Omit<Theme, 'gridY' | 'gridX'> & {
  gridX: Partial<Grid>;
  gridY: Partial<Grid>;
};
export type PartialBarChartSettings = Omit<BarChartSettings, 'theme'> & {
  theme: Partial<PartialTheme>;
};

const transform: WidgetTransform<PartialBarChartSettings> = {
  serializeIn: (settings) => {
    const { yScaleSettings, theme } = settings;
    return {
      verticalGrid: theme.gridX.enabled,
      horizontalGrid: theme.gridY.enabled,
      formatValue:
        typeof yScaleSettings?.formatLabel === 'string'
          ? yScaleSettings.formatLabel
          : null,
    };
  },
  serializeOut: ({ formatValue, verticalGrid, horizontalGrid }) => {
    return {
      yScaleSettings: {
        type: 'linear',
        formatLabel: formatValue,
      },
      tooltipSettings: {
        formatValue,
      },
      theme: {
        gridY: {
          enabled: verticalGrid,
        },
        gridX: {
          enabled: horizontalGrid,
        },
      },
    };
  },
};

export default transform;
