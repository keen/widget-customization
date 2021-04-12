import { FunnelChartSettings } from '@keen.io/charts';

import transform from './transform';

test('transforms metric chart settings to customization interface', () => {
  const chartSettings = {
    formatValues: null,
  } as FunnelChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
  });
});

test('transforms metric chart scale label format settings to customization interface', () => {
  const chartSettings = {
    formatValues: '${number; 0.00}$',
  } as FunnelChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00}$',
  });
});

test('transforms customization interface to metric settings ', () => {
  const settings = {
    formatValue: '${number; 0.00}$',
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "formatValues": "\${number; 0.00}$",
    }
  `);
});
