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
  const [state, setState] = useState<FormatterSettings>(initialState);

  useEffect(() => {
    if (formatValue) {
      const settings = createFormatterSettings(formatValue);
      setState(settings);
    }
  }, []);

  useEffect(() => {
    const settings = createFormatterSettings(formatValue);
    setState((state) => ({ ...state, ...settings }));
  }, [formatValue]);

  const { prefix, suffix } = state;

  useDebounce(
    () => {
      const newFormatValue = serializeFormatterSettings({
        prefix,
        suffix,
      });
      if (newFormatValue !== formatValue) {
        onUpdateFormatValue(newFormatValue);
      }
    },
    300,
    [state, formatValue]
  );

  return (
    <PrefixAndSuffix
      onChange={(values) => setState({ ...state, ...values })}
      prefix={state.prefix}
      suffix={state.suffix}
    />
  );
};

export default StringFormatter;
