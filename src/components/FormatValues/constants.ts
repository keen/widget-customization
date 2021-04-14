import { SUPPORTED_FORMATTER_PATTERNS, OPERATIONS } from '../../constants';

export const PATTERNS_OPTIONS = SUPPORTED_FORMATTER_PATTERNS.map((pattern) => ({
  label: pattern,
  value: pattern,
}));

export const OPERATIONS_OPTIONS = OPERATIONS.map((operation) => ({
  label: operation.replace(/^\w/, (c: string) => c.toUpperCase()),
  value: operation,
}));

export const FULL_NUMBER_PATTERN = '0';
