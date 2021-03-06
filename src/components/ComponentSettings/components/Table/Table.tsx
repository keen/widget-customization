import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SettingsItem from '../../../SettingsItem';
import SectionTitle from '../../../SectionTitle';

import { SettingsModifier } from '../types';
import { RowsPerPage } from './components';

const TableSettings: FC<SettingsModifier> = ({
  widgetSettings,
  chartSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  hiddenOptions,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle title={t('widget_customization_table_settings.title')} />
      {!hiddenOptions?.card && (
        <SettingsItem
          id="table-card"
          label={t('widget_customization_card_settings.label')}
          isEnabled={widgetSettings.card.enabled}
          onChange={(cardEnabled) => {
            onUpdateWidgetSettings({
              ...widgetSettings,
              card: { ...widgetSettings.card, enabled: cardEnabled },
            });
          }}
        />
      )}
      <SettingsItem
        id="table-pagination"
        isEnabled={chartSettings.pagination}
        label={t('widget_customization_table_settings.pagination')}
        onChange={(pagination) => {
          onUpdateChartSettings({
            ...chartSettings,
            pagination,
          });
        }}
      />
      <RowsPerPage
        rowsPerPage={chartSettings.rowsPerPage}
        isPaginationEnabled={chartSettings.pagination}
        onChange={(rowsPerPage) =>
          onUpdateChartSettings({
            ...chartSettings,
            rowsPerPage,
          })
        }
      />
      <SettingsItem
        id="table-selectable-rows"
        isEnabled={chartSettings.rowsSelection}
        label={t('widget_customization_table_settings.multiple_rows_selection')}
        onChange={(rowsSelection) => {
          onUpdateChartSettings({
            ...chartSettings,
            rowsSelection,
          });
        }}
      />
    </div>
  );
};

export default TableSettings;
