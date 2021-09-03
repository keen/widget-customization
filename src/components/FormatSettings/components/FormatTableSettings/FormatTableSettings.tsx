import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { transparentize } from 'polished';

import {
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  Input,
  Label,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { ChartEvents, TableEvents } from '@keen.io/charts';
import { extractFormatterType } from '@keen.io/charts-utils';

import SectionTitle from '../../../SectionTitle';
import { AppContext } from '../../../../contexts';

import { PrefixAndSuffix } from '../index';
import NumericFormatter from '../NumericFormatter';
import { DateTimeFormatter } from '../DateTimeFormater';

import {
  InputWrapper,
  SettingsColumn,
  Container,
  ControlContainer,
} from './FormatTableSettings.styles';
import { DATA_TYPES, DataTypes } from './constants';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: Record<string, any>) => void;
  /** Settings disabled for customization */
  formattingDisabled?: string;
  /** Settings are not available */
  formattingNotAvailable?: string;
};

const FormatTableSettings: FC<Props> = ({
  formatValue,
  onUpdateFormatValue,
}) => {
  const chartEventsRef = useRef<ChartEvents<TableEvents>>();

  const [format, setFormat] = useState({
    prefix: 'test',
    suffix: 'test2',
  });

  const { pubSub } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataType, setDataType] = useState<DataTypes | null>(null);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const onChartEvent = (tableEvent) => {
    // useEffect
    if (tableEvent.eventName === '@table/columns-selected') {
      const selectedColumns = tableEvent.meta.selection;
      setSelectedColumns(selectedColumns);
      if (selectedColumns.length === 0) return setDataType(null);
      if (selectedColumns.length === 1) {
        // todo destructirization of first ele
        if (selectedColumns[0].formatter) {
          return setDataType(
            extractFormatterType(selectedColumns[0].formatter) as DataTypes
          );
        }
        return setDataType(selectedColumns[0].dataType as DataTypes);
      }
      const allColumnTypesAreEqual = selectedColumns.every(
        (column) => column.dataType === selectedColumns[0].dataType
      );
      if (allColumnTypesAreEqual) {
        return setDataType(selectedColumns[0].dataType as DataTypes);
      }
      setDataType(DataTypes.notDefined);
    }
  };

  useEffect(() => {
    chartEventsRef.current = new ChartEvents<TableEvents>({ pubsub: pubSub });
    const chartEventsUnsubscribe = chartEventsRef.current.subscribe(
      onChartEvent
    );
    return () => {
      chartEventsRef.current.publish({ eventName: '@table/deselect-columns' });
      chartEventsUnsubscribe();
    };
  }, []);

  const onUpdateFormat = (value) => {
    const formatters = {};
    selectedColumns.forEach((column) => {
      formatters[column.name] = value;
    });
    onUpdateFormatValue(formatters);
  };

  return (
    <Container>
      {!dataType ? (
        'Select column'
      ) : (
        <>
          <SettingsColumn>
            <SectionTitle title="Column name & Data Type" />
            <ControlContainer>
              <Label variant="secondary">Column Name</Label>
              <InputWrapper>
                <Input
                  defaultValue={'Column name'}
                  placeholder={'Column name'}
                  variant="solid"
                  onChange={(e) => console.log(e)}
                />
              </InputWrapper>
            </ControlContainer>
            <ControlContainer>
              <Label variant="secondary">Data type</Label>
              <InputWrapper>
                <DropableContainer
                  variant="secondary"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  isActive={dropdownOpen}
                  value={dataType || 'Select'}
                  dropIndicator
                  onDefocus={() => setDropdownOpen(false)}
                >
                  {dataType || 'Select'}
                </DropableContainer>
                <Dropdown isOpen={dropdownOpen}>
                  <DropdownListContainer scrollToActive maxHeight={150}>
                    {(activeItemRef) => (
                      <DropdownList
                        ref={activeItemRef}
                        items={DATA_TYPES}
                        setActiveItem={(item) => dataType === item.value}
                        onClick={(e, item) => {
                          setDataType(item.value);
                          setDropdownOpen(!dropdownOpen);
                        }}
                      />
                    )}
                  </DropdownListContainer>
                </Dropdown>
              </InputWrapper>
            </ControlContainer>
            <BodyText
              variant="body2"
              color={transparentize(0.5, colors.black[100])}
            >
              Select multiple columns with the same data type to apply the same
              formatting.
            </BodyText>
          </SettingsColumn>
          <SettingsColumn>
            <SectionTitle title="Values format" />
            {dataType === DataTypes.string && (
              <PrefixAndSuffix
                onChange={({ prefix, suffix }) => setFormat({ prefix, suffix })}
                prefix={format.prefix}
                suffix={format.suffix}
              />
            )}
            {dataType === DataTypes.number && (
              <NumericFormatter
                formatValue={formatValue}
                onUpdateFormatValue={onUpdateFormat}
              />
            )}
            {dataType === DataTypes.dateTime && (
              <DateTimeFormatter
                formatValue={formatValue}
                onUpdateFormatValue={onUpdateFormat}
              />
            )}
            {dataType === DataTypes.boolean && <p>Boolean not supported</p>}
          </SettingsColumn>
        </>
      )}
    </Container>
  );
};

export default FormatTableSettings;
