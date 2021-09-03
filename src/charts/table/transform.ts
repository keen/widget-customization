import { TableChartSettings } from '@keen.io/charts';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<TableChartSettings> = {
  serializeIn: (settings) => {
    const { formatValue } = settings;

    return {
      formatTableColumns: formatValue || {},
    };
  },
  serializeOut: ({ formatTableColumns }) => {
    return {
      formatValue: formatTableColumns,
    };
  },
};

export default transform;
