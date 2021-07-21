import { LineChartSettings, Grid } from '@keen.io/charts';

import { WidgetTransform } from '../../types';

export type PartialLineChartSettings = Omit<LineChartSettings, 'theme'> & {
  theme: {
    gridX: Partial<Grid>;
    gridY: Partial<Grid>;
  };
};

const transform: WidgetTransform<PartialLineChartSettings> = {
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
  serializeOut: ({ formatValue, horizontalGrid, verticalGrid }) => {
    return {
      yScaleSettings: {
        type: 'linear',
        formatLabel: formatValue,
      },
      theme: {
        gridY: {
          enabled: horizontalGrid,
        },
        gridX: {
          enabled: verticalGrid,
        },
      },
      tooltipSettings: {
        formatValue,
      },
    };
  },
};

export default transform;
