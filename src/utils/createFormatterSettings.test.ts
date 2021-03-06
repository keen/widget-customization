import createFormatterSettings from './createFormatterSettings';

test('create formatter settings for null value', () => {
  const value = null;
  const result = createFormatterSettings(value, 'string');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "dateFormat": null,
      "operation": null,
      "precision": null,
      "prefix": null,
      "separator": null,
      "suffix": null,
      "timeFormat": null,
      "value": null,
      "variableType": "string",
    }
  `);
});

test('create formatter settings for simple string', () => {
  const value = 'prefix';
  const result = createFormatterSettings(value, 'string');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "dateFormat": null,
      "operation": null,
      "precision": null,
      "prefix": "prefix",
      "separator": null,
      "suffix": undefined,
      "timeFormat": null,
      "value": null,
      "variableType": "string",
    }
  `);
});

test('create formatter settings for basic formatter', () => {
  const value = '${number;}';
  const result = createFormatterSettings(value, 'number');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "dateFormat": null,
      "operation": null,
      "precision": null,
      "prefix": "",
      "separator": null,
      "suffix": "",
      "timeFormat": null,
      "value": null,
      "variableType": "number",
    }
  `);
});

test('create formatter settings for basic formatting option', () => {
  const value = '${number; 0a}';
  const result = createFormatterSettings(value, 'number');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "dateFormat": null,
      "operation": null,
      "precision": "0a",
      "prefix": "",
      "separator": false,
      "suffix": "",
      "timeFormat": null,
      "value": null,
      "variableType": "number",
    }
  `);
});

test('create formatter settings for basic formatting option with operation', () => {
  const value = '${number; 0a; multiply; 100}';
  const result = createFormatterSettings(value, 'number');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "dateFormat": null,
      "operation": "multiply",
      "precision": "0a",
      "prefix": "",
      "separator": false,
      "suffix": "",
      "timeFormat": null,
      "value": "100",
      "variableType": "number",
    }
  `);
});

test('create formatter settings for basic formatting option with prefix and suffix', () => {
  const value = 'prefix${number; 0a; power; 100}suffix';
  const result = createFormatterSettings(value, 'number');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "dateFormat": null,
      "operation": "power",
      "precision": "0a",
      "prefix": "prefix",
      "separator": false,
      "suffix": "suffix",
      "timeFormat": null,
      "value": "100",
      "variableType": "number",
    }
  `);
});
