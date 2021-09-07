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

const applyPrefixAndSuffix = (prefix, suffix) => {
  let serializedSettings = '';
  if (prefix && suffix) {
    serializedSettings = prefix + '${}' + suffix;
  } else if (prefix) {
    serializedSettings = prefix + '${}';
  } else if (suffix) {
    serializedSettings = '${}' + suffix;
  }
  return serializedSettings;
};

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
    precisionString = '${datetime';
    if (dateFormat && dateFormat !== 'original') {
      precisionString += ';' + dateFormat;
      if (timeFormat) precisionString += `; ${timeFormat}`;
    }
    precisionString += '}';
    serializedSettings = precisionString;
  } else if (variableType === 'string') {
    serializedSettings = applyPrefixAndSuffix(prefix, suffix);
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
