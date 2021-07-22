import React, { FC } from 'react';
import { Toggle } from '@keen.io/ui-core';

import Label from '../Label';
import Row from '../Row';

type Props = {
  /* Component id */
  id: string;
  /* Component label */
  label: string;
  /* Component state */
  isEnabled: boolean;
  /* Change event handler */
  onChange: (isEnabled: boolean) => void;
};

const SettingsItem: FC<Props> = ({ id, label, isEnabled, onChange }) => (
  <Row data-testid={id}>
    <Label>{label}</Label>
    <Toggle
      isOn={isEnabled}
      onChange={(cardEnabled) => onChange(cardEnabled)}
    />
  </Row>
);

export default SettingsItem;
