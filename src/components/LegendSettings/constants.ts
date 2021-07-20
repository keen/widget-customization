import { Position, Alignment } from '@keen.io/ui-core';

export const POSITION_SETTINGS: {
  id: string;
  label: string;
  value: Position;
}[] = [
  { id: 'top', label: 'Top', value: 'top' },
  { id: 'bottom', label: 'Bottom', value: 'bottom' },
  { id: 'left', label: 'Left', value: 'left' },
  { id: 'right', label: 'Right', value: 'right' },
];

export const ALIGNMENT_SETTINGS: {
  id: string;
  label: string;
  value: Alignment;
}[] = [
  { id: 'left', label: 'Left', value: 'left' },
  { id: 'center', label: 'Center', value: 'center' },
  { id: 'right', label: 'Right', value: 'right' },
];
