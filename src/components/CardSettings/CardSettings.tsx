import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@keen.io/ui-core';

import Label from '../Label';
import Row from '../Row';

type Props = {
  /* Card component state */
  isEnabled: boolean;
  /* Change event handler */
  onChange: (isEnabled: boolean) => void;
};

const CardSettings: FC<Props> = ({ isEnabled, onChange }) => {
  const { t } = useTranslation();

  return (
    <Row data-testid="card-settings">
      <Label>{t('widget_customization_card_settings.label')}</Label>
      <Toggle
        isOn={isEnabled}
        onChange={(cardEnabled) => onChange(cardEnabled)}
      />
    </Row>
  );
};

export default CardSettings;
