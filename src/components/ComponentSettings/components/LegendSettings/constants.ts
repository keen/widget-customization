import { Position, Alignment } from '@keen.io/ui-core';

type AlignmentSettings = {
  id: string;
  label: string;
  value: Alignment;
};

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

export const HORIZONTAL_ALIGNMENT_SETTINGS: AlignmentSettings[] = [
  { id: 'left', label: 'Left', value: 'left' },
  { id: 'center', label: 'Center', value: 'center' },
  { id: 'right', label: 'Right', value: 'right' },
];

export const VERTICAL_ALIGNMENT_SETTINGS: AlignmentSettings[] = [
  { id: 'left', label: 'Top', value: 'left' },
  { id: 'center', label: 'Middle', value: 'center' },
  { id: 'right', label: 'Bottom', value: 'right' },
];
