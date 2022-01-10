import { TableChartSettings } from '@keen.io/charts';
import { PER_PAGE_OPTIONS } from '@keen.io/ui-core';
import { WidgetTransform } from '../../types';

const transform: WidgetTransform<TableChartSettings> = {
  serializeIn: (settings) => {
    const {
      formatValue,
      columnsNamesMapping,
      rowsSelection,
      pagination = true,
      rowsPerPage = PER_PAGE_OPTIONS[3],
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
