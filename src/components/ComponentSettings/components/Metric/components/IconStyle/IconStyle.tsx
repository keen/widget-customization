import React, { FC } from 'react';
import { RadioSelect } from '@keen.io/ui-core';
import { useTranslation } from 'react-i18next';

import { RadioSelectContainer } from './IconStyle.styles';

import { ICON_STYLE_OPTIONS } from './constants';
import Label from '../../../../../Label';
import Row from '../../../../../Row';

type Props = {
  /** Value mode */
  iconStyle: string;
  /** Update settings event handler */
  onChange: (settings) => void;
};

const IconStyle: FC<Props> = ({ onChange, iconStyle }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Label>{t('widget_customization_metric_settings.icon_style')}</Label>
        <RadioSelectContainer>
          <RadioSelect
            activeItem={iconStyle ? iconStyle : ICON_STYLE_OPTIONS[0].value}
            items={ICON_STYLE_OPTIONS}
            onClick={({ value }) => onChange(value)}
          />
        </RadioSelectContainer>
      </Row>
    </div>
  );
};

export default IconStyle;
