import {
  OPERATIONS,
  SUPPORTED_FORMATTER_PATTERNS,
} from '../../../../../constants';

export const PATTERNS_OPTIONS = SUPPORTED_FORMATTER_PATTERNS.map((pattern) => ({
  label: pattern,
  value: pattern,
}));

export const OPERATIONS_OPTIONS = OPERATIONS.map((operation) => ({
  label: operation.replace(/^\w/, (c: string) => c.toUpperCase()),
  value: operation,
}));

export const TOAST_MOTION = {
  entering: { opacity: 1 },
  entered: {},
  exiting: { opacity: 0 },
  exited: {},
};
