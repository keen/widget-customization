import { HeatmapChartSettings } from '@keen.io/charts';
import { Layout } from '@keen.io/ui-core';

import transform from './transform';

test('transforms heatmap chart settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: null },
    yAxisTitle: 'Revenue',
  } as HeatmapChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
    yAxisTitle: 'Revenue',
  });
});

test('transforms heatmap chart scale label format settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: '${number; 0.00}$' },
  } as HeatmapChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00}$',
  });
});

test('transforms customization interface to heatmap settings ', () => {
  const settings = {
    layout: 'horizontal' as Layout,
    formatValue: '${number; 0.00}$',
    xAxisTitle: 'Time',
    yAxisTitle: 'Revenue',
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "layout": "horizontal",
      "tooltipSettings": Object {
        "formatValue": "\${number; 0.00}$",
      },
      "xAxisTitle": "Time",
      "yAxisTitle": "Revenue",
    }
  `);
});
