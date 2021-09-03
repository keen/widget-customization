import { CircularChartValueMode } from '../../../../../../types';

type AlignmentSettings = {
  id: string;
  label: string;
  value: CircularChartValueMode;
};

export const VALUE_MODE_SETTINGS: AlignmentSettings[] = [
  { id: 'percentage', label: 'Percentage', value: 'percentage' },
  { id: 'numeric', label: 'Numeric', value: 'numeric' },
];
