import transform, { PartialFunnelChartSettings } from './transform';

test('transforms funnel format settings to customization interface', () => {
  const chartSettings = {
    formatValues: null,
    theme: {
      funnel: {
        header: {
          badge: {
            enabled: false,
          },
        },
      },
    },
  } as PartialFunnelChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
    funnelPercentages: false,
  });
});

test('transforms funnel chart value format settings to customization interface', () => {
  const chartSettings = {
    formatValues: '${number; 0.00}$',
    theme: {
      funnel: {
        header: {
          badge: {
            enabled: true,
          },
        },
      },
    },
  } as PartialFunnelChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00}$',
    funnelPercentages: true,
  });
});

test('transforms customization interface to funnel settings ', () => {
  const settings = {
    formatValue: '${number; 0.00}$',
    funnelPercentages: true,
  };

  expect(transform.serializeOut(settings)).toMatchInlineSnapshot(`
    Object {
      "formatValues": "\${number; 0.00}$",
      "theme": Object {
        "funnel": Object {
          "header": Object {
            "badge": Object {
              "enabled": true,
            },
          },
        },
      },
    }
  `);
});
