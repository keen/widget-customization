import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@keen.io/ui-core';

import Label from '../../../Label';
import Row from '../../../Row';

import { ChartCustomizationSettings } from '../../../../types';

type Props = {
  /* Vertical grid */
  verticalGrid: boolean;
  /* Horizontal grid */
  horizontalGrid: boolean;
  /** Settings change event handler */
  onChange: (settings: Partial<ChartCustomizationSettings>) => void;
};

const GridSettings: FC<Props> = ({
  verticalGrid,
  horizontalGrid,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Row data-testid="vertical-grid">
        <Label>{t('widget_customization_grid_settings.vertical_grid')}</Label>
        <Toggle
          isOn={verticalGrid}
          onChange={(gridEnabled) => onChange({ verticalGrid: gridEnabled })}
        />
      </Row>
      <Row data-testid="horizontal-grid">
        <Label>{t('widget_customization_grid_settings.horizontal_grid')}</Label>
        <Toggle
          isOn={horizontalGrid}
          onChange={(gridEnabled) => onChange({ horizontalGrid: gridEnabled })}
        />
      </Row>
    </>
  );
};

export default GridSettings;
