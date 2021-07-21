import transform, { PartialLineChartSettings } from './transform';

test('transforms line chart settings to customization interface', () => {
  const chartSettings = {
    yScaleSettings: { type: 'linear', formatLabel: null },
    theme: {
      gridX: {
        enabled: true,
      },
      gridY: {
        enabled: true,
      },
    },
  } as PartialLineChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
    horizontalGrid: true,
    verticalGrid: true,
  });
});

test('transforms line chart scale label format settings to customization interface', () => {
  const chartSettings = {
    yScaleSettings: {
      type: 'linear',
      formatLabel: '${number; 0.00; multiply; 100}£',
    },
    theme: {
      gridX: {
        enabled: false,
      },
      gridY: {
        enabled: false,
      },
    },
  } as PartialLineChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00; multiply; 100}£',
    horizontalGrid: false,
    verticalGrid: false,
  });
});

test('transforms customization interface to line settings ', () => {
  const settings = {
    formatValue: '${number; 0.00}$',
    horizontalGrid: true,
    verticalGrid: false,
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "theme": Object {
        "gridX": Object {
          "enabled": false,
        },
        "gridY": Object {
          "enabled": true,
        },
      },
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
