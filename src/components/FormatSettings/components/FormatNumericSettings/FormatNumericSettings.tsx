import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SectionTitle from '../../../SectionTitle';
import { NumericFormatter } from '../Formatters';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const FormatNumericSettings: FC<Props> = ({
  formatValue,
  onUpdateFormatValue,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle
        title={t('widget_customization_format_value_settings.section_title')}
        description={t(
          'widget_customization_format_value_settings.section_description'
        )}
        onClear={() => onUpdateFormatValue(null)}
      />
      <NumericFormatter
        formatValue={formatValue}
        onUpdateFormatValue={onUpdateFormatValue}
      />
    </div>
  );
};

export default FormatNumericSettings;
