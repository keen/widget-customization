import { TableChartSettings } from '@keen.io/charts';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<TableChartSettings> = {
  serializeIn: (settings) => {
    const { formatValue, columnsNamesMapping } = settings;

    return {
      formatTableColumns: formatValue || {},
      columnsNamesMapping: columnsNamesMapping || {},
    };
  },
  serializeOut: ({ formatTableColumns, columnsNamesMapping }) => {
    return {
      formatValue: formatTableColumns,
      columnsNamesMapping,
    };
  },
};

export default transform;
