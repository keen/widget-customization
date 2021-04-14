import { FormatterSettings } from '../types';

/**
 * Creates basic settings for formatter.
 *
 * @return default formatter settings
 *
 */

const regexp = /\${(.+)}/g;

const createFormatterSettings = (formatValue: string | null) => {
  let precision = null;
  let operation = null;
  let value = null;
  let separator = null;

  if (!formatValue) {
    return {
      prefix: null,
      suffix: null,
      precision,
      operation,
      value,
      separator,
    };
  }

  const [prefix, pattern, suffix] = formatValue.split(regexp);

  if (pattern) {
    const [, formatPrecision, formatOperation, formatValue] = pattern.split(
      ';'
    );
    if (formatPrecision) {
      const precisionArr = formatPrecision.trim().split(',');
      precision = precisionArr[precisionArr.length - 1];
      separator = precisionArr.length > 1;
    }
    operation = formatOperation ? formatOperation.trim() : null;
    value = formatValue ? formatValue.trim() : null;
  }

  return {
    prefix,
    suffix,
    precision,
    operation,
    value,
    separator,
  } as FormatterSettings;
};

export default createFormatterSettings;
