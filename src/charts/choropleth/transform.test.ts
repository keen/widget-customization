import transform, { PartialChoroplethChartSettings } from './transform';

test('transforms choropleth chart settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: null },
  } as PartialChoroplethChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: null,
  });
});

test('transforms choropleth chart scale label format settings to customization interface', () => {
  const chartSettings = {
    tooltipSettings: { formatValue: '${number; 0.00}$' },
  } as PartialChoroplethChartSettings;

  expect(transform.serializeIn(chartSettings)).toEqual({
    formatValue: '${number; 0.00}$',
  });
});

test('transforms customization interface to choropleth settings ', () => {
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
