import { FunnelChartSettings } from '@keen.io/charts';

import transform from './transform';

test('transforms funnel format settings to customization interface', () => {
  const chartSettings = {
    formatValues: null,
  } as FunnelChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
  });
});

test('transforms funnel chart value format settings to customization interface', () => {
  const chartSettings = {
    formatValues: '${number; 0.00}$',
  } as FunnelChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00}$',
  });
});

test('transforms customization interface to funnel settings ', () => {
  const settings = {
    formatValue: '${number; 0.00}$',
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "formatValues": "\${number; 0.00}$",
    }
  `);
});
