import { LineChartSettings } from '@keen.io/charts';

import transform from './transform';

test('transforms line chart settings to customization interface', () => {
  const chartSettings = {
    yScaleSettings: { type: 'linear', formatLabel: null },
  } as LineChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
  });
});

test('transforms line chart scale label format settings to customization interface', () => {
  const chartSettings = {
    yScaleSettings: {
      type: 'linear',
      formatLabel: '${number; 0.00; multiply; 100}£',
    },
  } as LineChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00; multiply; 100}£',
  });
});

test('transforms customization interface to line settings ', () => {
  const settings = {
    formatValue: '${number; 0.00}$',
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "tooltipSettings": Object {
        "formatValue": "\${number; 0.00}$",
      },
      "yScaleSettings": Object {
        "formatLabel": "\${number; 0.00}$",
        "type": "linear",
      },
    }
  `);
});
