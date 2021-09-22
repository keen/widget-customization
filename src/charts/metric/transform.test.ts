import transform, { PartialMetricChartSettings } from './transform';

test('transforms metric chart settings to customization interface', () => {
  const chartSettings = {
    formatValue: null,
    theme: {
      metric: {
        icon: {
          enabled: true,
          style: 'regular',
          type: 'click-outline',
        },
      },
    },
  } as PartialMetricChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
    iconEnabled: true,
    iconStyle: 'regular',
    iconType: 'click-outline',
  });
});

test('transforms metric chart scale label format settings to customization interface', () => {
  const chartSettings = {
    formatValue: '${number; 0.00}$',
  } as PartialMetricChartSettings;

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
      "formatValue": "\${number; 0.00}$",
      "theme": Object {
        "metric": Object {
          "icon": Object {
            "enabled": undefined,
            "style": undefined,
            "type": undefined,
          },
        },
      },
    }
  `);
});
