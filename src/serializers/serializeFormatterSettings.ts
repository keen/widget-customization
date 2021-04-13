import { FormatterSettings } from '../types';
import { DEFAULT_PATTERN } from '../constants';

const serializeFormatterSettings = (settings: FormatterSettings) => {
  const { prefix, suffix, precision, operation, value } = settings;

  let serializedSettings = '';

  if (prefix) serializedSettings += prefix;

  if (precision && precision !== DEFAULT_PATTERN.value) {
    const operationText = operation && value ? `${operation}; ${value}` : '';
    serializedSettings += `\$\{number; ${precision}; ${operationText}}`;
  }

  if (suffix) serializedSettings += suffix;

  return serializedSettings;
};

export default serializeFormatterSettings;
