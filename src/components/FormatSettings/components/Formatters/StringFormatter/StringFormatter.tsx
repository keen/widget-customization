import React, { FC, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { PrefixAndSuffix } from '../components';

import { FormatterSettings } from '../../../../../types';
import { createFormatterSettings } from '../../../../../utils';
import { serializeFormatterSettings } from '../../../../../serializers';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const initialState: FormatterSettings = {
  prefix: '',
  suffix: '',
};

const StringFormatter: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const [formatterElements, setFormatterElements] = useState<FormatterSettings>(
    initialState
  );
  const [format, setFormat] = useState(formatValue);

  useEffect(() => {
    const settings = createFormatterSettings(formatValue, 'string');
    setFormatterElements((state) => ({ ...state, ...settings }));
  }, [formatValue]);

  useDebounce(() => onUpdateFormatValue(format), 300, [format]);

  const onFormatChange = (newValues) => {
    const newFormatterElements = { ...formatterElements, ...newValues };
    setFormatterElements(newFormatterElements);
    setFormat(serializeFormatterSettings(newFormatterElements));
  };

  return (
    <PrefixAndSuffix
      onChange={onFormatChange}
      prefix={formatterElements.prefix}
      suffix={formatterElements.suffix}
    />
  );
};

export default StringFormatter;
