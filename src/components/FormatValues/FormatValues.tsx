import React, { FC } from 'react';
import { Input } from '@keen.io/ui-core';

type Props = {
  formatValue: string | null,
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const FormatValues: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {

  return (
    <div>
    <Input
      defaultValue={formatValue}
      variant="solid"
      onChange={(e) => {
        const value = e.currentTarget.value ? e.currentTarget.value : null;
        onUpdateFormatValue(value);
      }}
    />
    </div>
  );
};

export default FormatValues;
