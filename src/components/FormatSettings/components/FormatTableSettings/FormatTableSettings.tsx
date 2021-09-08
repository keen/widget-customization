import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { transparentize } from 'polished';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  Input,
  Label,
  Title,
} from '@keen.io/ui-core';
import { BodyText, Headline } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { ChartEvents, TableEvents } from '@keen.io/charts';
import { extractFormatterType } from '@keen.io/charts-utils';

import SectionTitle from '../../../SectionTitle';
import { AppContext } from '../../../../contexts';

import {
  InputWrapper,
  SettingsColumnLeft,
  SettingsColumnRight,
  Container,
  ControlContainer,
  SelectColumnInfo,
  FormatInfo,
  TitleWrapper,
  TitleActions,
  DropdownInfo,
} from './FormatTableSettings.styles';
import { DATA_TYPES, DataTypes } from './constants';
import {
  DateTimeFormatter,
  NumericFormatter,
  StringFormatter,
} from '../Formatters';

type Props = {
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: Record<string, any>) => void;
  /** Update column name */
  onUpdateColumnName: (name: string, newName: string) => void;
  /** Settings disabled for customization */
  formattingDisabled?: string;
  /** Settings are not available */
  formattingNotAvailable?: string;
  /** Columns rename settings */
  columnsNamesMapping: Record<string, string>;
};

const FormatTableSettings: FC<Props> = ({
  onUpdateFormatValue,
  onUpdateColumnName,
  columnsNamesMapping,
}) => {
  const chartEventsRef = useRef<ChartEvents<TableEvents>>();
  const { t } = useTranslation();

  const { pubSub } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [formatValue, setFormatValue] = useState(null);

  const TranslatedDataTypes = DATA_TYPES.map(({ label, value }) => ({
    label: t(label),
    value,
  }));

  const selectedColumnsAreEqual = (selectedColumns) => {
    const [firstSelectedColumn] = selectedColumns;
    return selectedColumns.every(
      (column) => column.dataType === firstSelectedColumn.dataType
    );
  };

  const onChartEvent = (tableEvent) => {
    if (tableEvent.eventName === '@table/columns-selected') {
      const selectedColumns = tableEvent.meta.selection;
      setSelectedColumns(selectedColumns);
      if (selectedColumns.length === 0) return setDataType(null);
      const [firstSelectedColumn] = selectedColumns;
      if (selectedColumns.length === 1) {
        setFormatValue(firstSelectedColumn.formatter);
        if (firstSelectedColumn.formatter) {
          return setDataType(
            extractFormatterType(firstSelectedColumn.formatter) as DataTypes
          );
        }
        return setDataType(firstSelectedColumn.dataType as DataTypes);
      }
      setFormatValue(null);
      const allColumnTypesAreEqual = selectedColumnsAreEqual(selectedColumns);
      if (allColumnTypesAreEqual) {
        return setDataType(firstSelectedColumn.dataType as DataTypes);
      }
      setDataType(DataTypes.notDefined);
    }
    if (tableEvent.eventName === '@table/deselect-columns') {
      setSelectedColumns([]);
      setDataType(null);
    }
  };

  const deselectColumns = () => {
    chartEventsRef.current.publish({ eventName: '@table/deselect-columns' });
  };

  useEffect(() => {
    chartEventsRef.current = new ChartEvents<TableEvents>({ pubsub: pubSub });
    const chartEventsUnsubscribe = chartEventsRef.current.subscribe(
      onChartEvent
    );
    return () => {
      deselectColumns();
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

  const selectedDataTypeOption = TranslatedDataTypes.find(
    (type) => type.value === dataType
  );

  return (
    <Container>
      {!dataType ? (
        <SelectColumnInfo>
          <BodyText
            variant="body1"
            color={transparentize(0.3, colors.black[100])}
          >
            {t(
              'widget_customization_format_value_settings.click_on_columns_to_select_data'
            )}
          </BodyText>
        </SelectColumnInfo>
      ) : (
        <>
          <SettingsColumnLeft>
            <TitleWrapper>
              <Headline variant="h4">
                {t(
                  'widget_customization_format_value_settings.column_name_and_data_type'
                )}
              </Headline>
              <TitleActions>
                <BodyText
                  variant="body2"
                  color={transparentize(0.3, colors.black[100])}
                >
                  ({t('widget_customization_format_value_settings.selected')}:{' '}
                  {selectedColumns.length})
                </BodyText>
                <Button
                  size="small"
                  style="outline"
                  variant="secondary"
                  onClick={deselectColumns}
                >
                  {t('widget_customization_format_value_settings.deselect_all')}
                </Button>
              </TitleActions>
            </TitleWrapper>
            <ControlContainer isDisabled={selectedColumns.length > 1}>
              <Label variant="secondary">
                {t('widget_customization_format_value_settings.column_name')}
              </Label>
              <InputWrapper>
                <Input
                  data-testid="column-name-input"
                  variant="solid"
                  value={
                    selectedColumns.length > 1
                      ? ''
                      : columnsNamesMapping[selectedColumns[0].name]
                  }
                  onChange={(e) =>
                    onUpdateColumnName(selectedColumns[0].name, e.target.value)
                  }
                />
              </InputWrapper>
            </ControlContainer>
            <ControlContainer>
              <Label variant="secondary">
                {t('widget_customization_format_value_settings.data_type')}
              </Label>
              <InputWrapper>
                <DropableContainer
                  variant="secondary"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  isActive={dropdownOpen}
                  placeholder={t(
                    'widget_customization_format_value_settings.select_data_type'
                  )}
                  value={selectedDataTypeOption && selectedDataTypeOption.value}
                  dropIndicator
                  onDefocus={() => setDropdownOpen(false)}
                >
                  {selectedDataTypeOption && selectedDataTypeOption.label}
                </DropableContainer>
                <Dropdown isOpen={dropdownOpen}>
                  {!selectedColumnsAreEqual(selectedColumns) && (
                    <DropdownInfo>
                      <Title variant="h5">
                        {t(
                          'widget_customization_format_value_settings.you_will_map_property'
                        )}
                      </Title>
                    </DropdownInfo>
                  )}
                  <DropdownListContainer scrollToActive maxHeight={150}>
                    {(activeItemRef) => (
                      <div>
                        <DropdownList
                          ref={activeItemRef}
                          items={TranslatedDataTypes}
                          setActiveItem={(item) => dataType === item.value}
                          onClick={(e, item) => {
                            setDataType(item.value);
                            setDropdownOpen(!dropdownOpen);
                          }}
                        />
                      </div>
                    )}
                  </DropdownListContainer>
                </Dropdown>
              </InputWrapper>
            </ControlContainer>
            <BodyText
              variant="body2"
              color={transparentize(0.5, colors.black[100])}
            >
              {t(
                'widget_customization_format_value_settings.select_multiple_columns_to_apply_formatting'
              )}
            </BodyText>
          </SettingsColumnLeft>
          <SettingsColumnRight>
            <SectionTitle
              title={t(
                'widget_customization_format_value_settings.values_format'
              )}
            />
            {dataType === DataTypes.string && (
              <StringFormatter
                formatValue={formatValue}
                onUpdateFormatValue={onUpdateFormat}
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
            {dataType === DataTypes.boolean && (
              <FormatInfo>
                <BodyText variant="body2" color={colors.blue[500]}>
                  {t(
                    'widget_customization_format_value_settings.boolean_not_supported'
                  )}
                </BodyText>
              </FormatInfo>
            )}
            {dataType === DataTypes.notDefined && (
              <FormatInfo data-testid="columns-format-notification">
                <BodyText variant="body2" color={colors.blue[500]}>
                  {t(
                    'widget_customization_format_value_settings.selected_columns_use_different_data_type'
                  )}
                  <br />
                  {t(
                    'widget_customization_format_value_settings.specify_data_type_to_apply_proper_formatting'
                  )}
                </BodyText>
              </FormatInfo>
            )}
          </SettingsColumnRight>
        </>
      )}
    </Container>
  );
};

export default FormatTableSettings;
