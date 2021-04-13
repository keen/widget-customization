import { PieChartSettings } from '@keen.io/charts';

import transform from './transform';

test('transforms pie chart settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: null },
  } as PieChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
  });
});

test('transforms pie chart scale label format settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: '${number; 0.00}$' },
  } as PieChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00}$',
  });
});

test('transforms customization interface to pie settings ', () => {
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
