import { TableChartSettings } from '@keen.io/charts';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<TableChartSettings> = {
  serializeIn: (settings) => {
    const { formatValue, columnsNamesMapping, rowsSelection } = settings;

    return {
      formatTableColumns: formatValue || {},
      columnsNamesMapping: columnsNamesMapping || {},
      rowsSelection,
    };
  },
  serializeOut: ({
    formatTableColumns,
    columnsNamesMapping,
    rowsSelection,
  }) => {
    return {
      formatValue: formatTableColumns,
      columnsNamesMapping,
      rowsSelection,
    };
  },
};

export default transform;
