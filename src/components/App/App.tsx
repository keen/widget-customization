import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PickerWidgets } from '@keen.io/widget-picker';
import { SideMenu } from '@keen.io/ui-core';

import {
  Layout,
  Section,
  SideMenuWrapper,
  HeadingSettingsContainer,
} from './App.styles';

import HeadingSettings from '../HeadingSettings';
import AxesTitles, { AXES_TITLES_WIDGETS } from '../AxesTitles';

import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
  SectionsConfiguration,
} from '../../types';
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
};

const App: FC<Props> = ({
  chart,
  widget,
  widgetType,
  savedQueryName,
  onUpdateChartSettings,
  onUpdateWidgetSettings,
  customizationSections,
}) => {
  const { t } = useTranslation();

  const {
    headingSettings,
    formatValues,
    componentSettings,
  } = customizationSections;

  const { title, subtitle } = widget;
  const { formatValue } = chart;

  const [activeMenuItemId, setActiveMenuItemId] = useState('titles');

  const MENU_ITEMS = [
    {
      id: 'titles',
      label: t('widget_customization_sections.titles'),
    },
    {
      id: 'formatting',
      label: t('widget_customization_sections.formatting'),
    },
    {
      id: 'chartElements',
      label: t('widget_customization_sections.components'),
    },
  ];

  return (
    <Layout>
      <SideMenuWrapper>
        <SideMenu
          menuItems={MENU_ITEMS}
          onChange={(itemId) => setActiveMenuItemId(itemId)}
          activeItemId={activeMenuItemId}
        />
      </SideMenuWrapper>
      {activeMenuItemId === 'titles' && (
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
      {activeMenuItemId === 'formatting' && (
        <Section>
          <FormatSettings
            widgetType={widgetType}
            chartSettings={chart}
            formattingDisabled={formatValues?.isDisabled}
            formattingNotAvailable={formatValues?.isNotAvailable}
            formatValue={formatValue}
            onUpdateFormatValue={(formatSettings) => {
              onUpdateChartSettings({
                ...chart,
                ...formatSettings,
              });
            }}
          />
        </Section>
      )}
      {activeMenuItemId === 'chartElements' && (
        <Section>
          <ComponentSettings
            widgetType={widgetType}
            chartSettings={chart}
            widgetSettings={widget}
            onUpdateWidgetSettings={onUpdateWidgetSettings}
            onUpdateChartSettings={onUpdateChartSettings}
            componentSettingsConfig={componentSettings}
          />
        </Section>
      )}
    </Layout>
  );
};

export default App;
