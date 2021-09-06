import {
  DateTimeFormatter,
  FormatterSettings,
  NumericFormatter,
} from '../types';
import {
  DEFAULT_FORMATTER_PATTERN,
  BASIC_FORMATTER_PATTERN,
} from '../constants';

const isEmpty = (arr: any[]) =>
  arr.every((item) => !item || item === DEFAULT_FORMATTER_PATTERN.value);

const serializeFormatterSettings = (settings: FormatterSettings) => {
  const { prefix, suffix, variableType } = settings;

  const shouldFormatSettings = !isEmpty(Object.values(settings));

  if (!shouldFormatSettings) return null;

  let serializedSettings = '';
  let precisionString = '';

  if (variableType === 'number') {
    const {
      precision,
      operation,
      value,
      separator,
    } = settings as NumericFormatter;
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
    const { dateFormat, timeFormat } = settings as DateTimeFormatter;
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
  } else {
    serializedSettings = prefix + '${}' + suffix;
  }

  return serializedSettings;
};

export default serializeFormatterSettings;
