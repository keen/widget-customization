import React, { FC, useRef } from 'react';
import { Input } from '@keen.io/ui-core';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const FormatValues: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const inputRef = useRef(null);

  return (
    <Input
      defaultValue={formatValue}
      ref={inputRef}
      variant="solid"
      onChange={(e) => {
        const value = e.currentTarget.value ? e.currentTarget.value : null;
        onUpdateFormatValue(value);
      }}
    />
  );
};

export default FormatValues;
