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

  if (!formatValue) {
    return {
      prefix: null,
      suffix: null,
      precision,
      operation,
      value,
    };
  }

  const [prefix, pattern, suffix] = formatValue.split(regexp);

  if (pattern) {
    const [, formatPrecision, formatOperation, formatValue] = pattern.split(
      ';'
    );
    precision = formatPrecision ? formatPrecision.trim() : null;
    operation = formatOperation ? formatOperation.trim() : null;
    value = +formatValue || null;
  }

  return {
    prefix,
    suffix,
    precision,
    operation,
    value,
  } as FormatterSettings;
};

export default createFormatterSettings;
