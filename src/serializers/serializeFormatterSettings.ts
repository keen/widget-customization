import { FormatterSettings } from '../types';
import {
  DEFAULT_FORMATTER_PATTERN,
  BASIC_FORMATTER_PATTERN,
} from '../constants';

const isEmpty = (arr: string[]) =>
  arr.every((item) => !item || item === DEFAULT_FORMATTER_PATTERN.value);

const serializeFormatterSettings = (settings: FormatterSettings) => {
  const {
    prefix,
    suffix,
    precision,
    operation,
    value,
    separator,
    dateFormat,
    timeFormat,
    variableType,
  } = settings;

  const shouldFormatSettings = !isEmpty([
    variableType,
    prefix,
    suffix,
    precision,
    operation,
    value,
    dateFormat,
    timeFormat,
  ]);

  if (!shouldFormatSettings) return null;

  let serializedSettings = '';
  let precisionString = '';

  if (variableType === 'number') {
    if (precision && precision !== DEFAULT_FORMATTER_PATTERN.value) {
      precisionString = `\$\{number; ${
        separator ? `0,${precision}` : precision
      }`;

      if (operation && value) {
        precisionString += `; ${operation}; ${value}`;
      }

      precisionString += '}';
      serializedSettings = precisionString;
    }

    if (
      (!precision || precision === DEFAULT_FORMATTER_PATTERN.value) &&
      (prefix || suffix)
    ) {
      precisionString = BASIC_FORMATTER_PATTERN;
    }
  } else if (variableType === 'datetime') {
    if (dateFormat === 'original') {
      precisionString = '${}';
    } else {
      precisionString = '${' + dateFormat;
      if (timeFormat) precisionString += `; ${timeFormat}`;
      precisionString += '}';
    }
  }

  if (precisionString) {
    if (prefix && suffix) {
      serializedSettings = `${prefix}${precisionString}${suffix}`;
    } else if (prefix) {
      serializedSettings = `${prefix}${precisionString}`;
    } else if (suffix) {
      serializedSettings = `${precisionString}${suffix}`;
    }
  }
  console.log('serializedSettings', serializedSettings);
  return serializedSettings;
};

export default serializeFormatterSettings;
