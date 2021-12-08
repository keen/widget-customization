import { FormatterSettings } from '../types';

/**
 * Creates basic settings for formatter.
 *
 * @return default formatter settings
 *
 */

const regexp = /\${(.*)}/g;

const createFormatterSettings = (
  formatValue: string | null,
  variableType?: string
) => {
  let precision = null;
  let operation = null;
  let value = null;
  let separator = null;
  let dateFormat = null;
  let timeFormat = null;

  if (!formatValue) {
    return {
      variableType,
      prefix: null,
      suffix: null,
      precision,
      operation,
      value,
      separator,
      dateFormat,
      timeFormat,
    };
  }

  const [prefix, pattern, suffix] = formatValue.split(regexp);

  if (pattern) {
    const [, ...additionalParameters] = pattern.split(';');
    if (variableType === 'number') {
      const [
        formatPrecision,
        formatOperation,
        formatValue,
      ] = additionalParameters;
      if (formatPrecision) {
        const precisionArr = formatPrecision.trim().split(',');
        precision = precisionArr[precisionArr.length - 1];
        separator = precisionArr.length > 1;
      }
      operation = formatOperation ? formatOperation.trim() : null;
      value = formatValue ? formatValue.trim() : null;
    } else if (variableType === 'datetime') {
      const [datePattern, timePattern] = additionalParameters;
      dateFormat = datePattern;
      timeFormat = timePattern;
    }
  }

  return {
    variableType,
    prefix,
    suffix,
    precision,
    operation,
    value,
    separator,
    dateFormat,
    timeFormat,
  } as FormatterSettings;
};

export default createFormatterSettings;
