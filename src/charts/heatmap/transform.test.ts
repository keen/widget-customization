import { HeatmapChartSettings } from '@keen.io/charts';

import transform from './transform';

test('transforms heatmap chart settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: null },
  } as HeatmapChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
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
    formatValue: '${number; 0.00}$',
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "tooltipSettings": Object {
        "formatValue": "\${number; 0.00}$",
      },
    }
  `);
});
