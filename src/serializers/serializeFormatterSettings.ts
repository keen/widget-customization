import { FormatterSettings } from '../types';
import {
  DEFAULT_FORMATTER_PATTERN,
  BASIC_FORMATTER_PATTERN,
} from '../constants';

const isEmpty = (arr: string[]) =>
  arr.every((item) => !item || item === DEFAULT_FORMATTER_PATTERN.value);

const serializeFormatterSettings = (settings: FormatterSettings) => {
  const { prefix, suffix, precision, operation, value, separator } = settings;

  const shouldFormatSettings = !isEmpty([
    prefix,
    suffix,
    precision,
    operation,
    value,
  ]);
  if (!shouldFormatSettings) return null;

  let serializedSettings = '';
  let precisionString = '';

  if (precision && precision !== DEFAULT_FORMATTER_PATTERN.value) {
    precisionString = `\$\{number; ${separator ? `0,${precision}` : precision}`;

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

  if (precisionString) {
    if (prefix && suffix) {
      serializedSettings = `${prefix}${precisionString}${suffix}`;
    } else if (prefix) {
      serializedSettings = `${prefix}${precisionString}`;
    } else if (suffix) {
      serializedSettings = `${precisionString}${suffix}`;
    }
  }

  return serializedSettings;
};

export default serializeFormatterSettings;
