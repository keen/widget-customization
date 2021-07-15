import transform, { PartialBarChartSettings } from './transform';

test('transforms bar chart settings to customization interface', () => {
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
  } as PartialBarChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
    horizontalGrid: true,
    verticalGrid: true,
  });
});

test('transforms bar chart scale label format settings to customization interface', () => {
  const chartSettings = {
    yScaleSettings: {
      type: 'linear',
      formatLabel: '${number; 0.00; multiply; 100}£',
    },
    theme: {
      gridX: {
        enabled: true,
      },
      gridY: {
        enabled: true,
      },
    },
  } as PartialBarChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00; multiply; 100}£',
    horizontalGrid: true,
    verticalGrid: true,
  });
});

test('transforms customization interface to bar settings ', () => {
  const settings = {
    formatValue: '${number; 0.00}$',
    theme: {
      gridX: {
        enabled: true,
      },
      gridY: {
        enabled: true,
      },
    },
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "theme": Object {
        "gridX": Object {
          "enabled": undefined,
        },
        "gridY": Object {
          "enabled": undefined,
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
