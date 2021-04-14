import serializeFormatterSettings from './serializeFormatterSettings';
import { FormatterSettings } from '../types';

test('serialize formatter settings for null object', () => {
  const settings = {
    operation: null,
    precision: null,
    prefix: null,
    suffix: null,
    value: null,
  };
  const result = serializeFormatterSettings(settings);

  expect(result).toMatchInlineSnapshot(`null`);
});

test('serialize formatter settings for prefix only', () => {
  const settings = {
    operation: null,
    precision: null,
    prefix: 'prefix',
    suffix: undefined,
    value: null,
  };
  const result = serializeFormatterSettings(settings);

  expect(result).toMatchInlineSnapshot(`"prefix\${number}"`);
});

test('serialize formatter settings for basic formatting option', () => {
  const settings = {
    operation: null,
    precision: '0.0',
    prefix: '',
    suffix: '',
    value: null,
  };
  const result = serializeFormatterSettings(settings);

  expect(result).toMatchInlineSnapshot(`"\${number; 0.0}"`);
});

test('serialize formatter settings for basic formatting option with operation', () => {
  const settings: FormatterSettings = {
    operation: 'multiply',
    precision: '0.0',
    prefix: '',
    suffix: '',
    value: '100',
  };
  const result = serializeFormatterSettings(settings);

  expect(result).toMatchInlineSnapshot(`"\${number; 0.0; multiply; 100}"`);
});

test('serialize formatter settings for basic formatting option with operation, prefix and suffix', () => {
  const settings: FormatterSettings = {
    operation: 'multiply',
    precision: '0.0',
    prefix: 'prefix',
    suffix: 'suffix',
    value: '100',
  };
  const result = serializeFormatterSettings(settings);

  expect(result).toMatchInlineSnapshot(
    `"prefix\${number; 0.0; multiply; 100}suffix"`
  );
});
