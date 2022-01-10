import { TableChartSettings } from '@keen.io/charts';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<TableChartSettings> = {
  serializeIn: (settings) => {
    const {
      formatValue,
      columnsNamesMapping,
      rowsSelection,
      pagination,
      rowsPerPage,
    } = settings;

    return {
      formatTableColumns: formatValue || {},
      columnsNamesMapping: columnsNamesMapping || {},
      rowsSelection,
      pagination,
      rowsPerPage,
    };
  },
  serializeOut: ({
    formatTableColumns,
    columnsNamesMapping,
    rowsSelection,
    pagination,
    rowsPerPage,
  }) => {
    return {
      formatValue: formatTableColumns,
      columnsNamesMapping,
      rowsSelection,
      pagination,
      rowsPerPage,
    };
  },
};

export default transform;
