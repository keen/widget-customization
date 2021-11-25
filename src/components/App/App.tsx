import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PickerWidgets } from '@keen.io/widget-picker';
import { SideMenu } from '@keen.io/ui-core';

import {
  HeadingSettingsContainer,
  Layout,
  Section,
  SideMenuWrapper,
} from './App.styles';

import HeadingSettings from '../HeadingSettings';
import AxesTitles, { AXES_TITLES_WIDGETS } from '../AxesTitles';

import {
  ChartCustomizationSettings,
  SectionsConfiguration,
  WidgetCustomizationSettings,
} from '../../types';
import { MENU_ITEMS, MENU_ITEMS_ENUM } from '../../constants';

import ComponentSettings from '../ComponentSettings/ComponentSettings';
import FormatSettings from '../FormatSettings/FormatSettings';

type Props = {
  /** Chart customization settings */
  chart: ChartCustomizationSettings;
  /** Widget customization settings */
  widget: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
  /** Customization sections configuration */
  customizationSections: SectionsConfiguration;
  /** Connected saved query name */
  savedQueryName?: string;
  /** Widget type */
  widgetType?: PickerWidgets;
  /** Callback which will be called on menu section change */
  onMenuItemChange?: (menuItemId: string) => void;
  /** Analysis result */
  analysisResult?: unknown;
};

const App: FC<Props> = ({
  chart,
  widget,
  widgetType,
  savedQueryName,
  onUpdateChartSettings,
  onUpdateWidgetSettings,
  customizationSections,
  onMenuItemChange,
  analysisResult,
}) => {
  const { t } = useTranslation();

  const {
    headingSettings,
    formatValues,
    componentSettings,
  } = customizationSections;

  const { title, subtitle } = widget;
  const { formatValue } = chart;
  const [activeMenuItemId, setActiveMenuItemId] = useState<MENU_ITEMS_ENUM>(
    MENU_ITEMS_ENUM.TITLES
  );
  const TranslatedMenuItems = MENU_ITEMS.map(({ id, label }) => ({
    id,
    label: t(label),
  }));

  const onMenuChange = (itemId) => {
    setActiveMenuItemId(itemId);
    onMenuItemChange && onMenuItemChange(itemId);
  };

  return (
    <Layout>
      <SideMenuWrapper>
        <SideMenu
          menuItems={TranslatedMenuItems}
          onChange={onMenuChange}
          activeItemId={activeMenuItemId}
        />
      </SideMenuWrapper>
      {activeMenuItemId === MENU_ITEMS_ENUM.TITLES && (
        <Section>
          <HeadingSettingsContainer>
            <HeadingSettings
              title={title}
              subtitle={subtitle}
              savedQueryName={savedQueryName}
              settingsDisabled={headingSettings?.isDisabled}
              onUpdateTitleSettings={(settings) =>
                onUpdateWidgetSettings({
                  ...widget,
                  title: settings,
                })
              }
              onUpdateSubtitleSettings={(settings) =>
                onUpdateWidgetSettings({
                  ...widget,
                  subtitle: settings,
                })
              }
            />
            {AXES_TITLES_WIDGETS.includes(widgetType) && (
              <AxesTitles
                settingsDisabled={headingSettings?.isDisabled}
                xAxisTitle={chart.xAxisTitle}
                yAxisTitle={chart.yAxisTitle}
                onUpdateAxesTitles={(axesTitles) =>
                  onUpdateChartSettings({
                    ...chart,
                    ...axesTitles,
                  })
                }
              />
            )}
          </HeadingSettingsContainer>
        </Section>
      )}
      {activeMenuItemId === MENU_ITEMS_ENUM.FORMATTING && (
        <Section>
          <FormatSettings
            widgetType={widgetType}
            chartSettings={chart}
            formattingDisabled={formatValues?.isDisabled}
            formattingNotAvailable={formatValues?.isNotAvailable}
            formatValue={formatValue}
            onUpdateColumnNamesMapping={(columns) => {
              onUpdateChartSettings({
                ...chart,
                ...columns,
              });
            }}
            onUpdateFormatValue={(formatSettings) => {
              onUpdateChartSettings({
                ...chart,
                ...formatSettings,
              });
            }}
          />
        </Section>
      )}
      {activeMenuItemId === MENU_ITEMS_ENUM.CHART_ELEMENTS && (
        <Section>
          <ComponentSettings
            widgetType={widgetType}
            chartSettings={chart}
            widgetSettings={widget}
            onUpdateWidgetSettings={onUpdateWidgetSettings}
            onUpdateChartSettings={onUpdateChartSettings}
            componentSettingsConfig={componentSettings}
            analysisResult={analysisResult}
          />
        </Section>
      )}
    </Layout>
  );
};

export default App;
