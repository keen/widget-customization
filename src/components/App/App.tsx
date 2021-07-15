import React, { FC, useState } from 'react';

import { Layout, Section, SideMenuWrapper } from './App.styles';

import HeadingSettings from '../HeadingSettings';
import FormatSettings from '../FormatSettings';

import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
  SectionsConfiguration,
} from '../../types';
import { SideMenu } from '@keen.io/ui-core';
import ComponentSettings from '../ComponentSettings/ComponentSettings';
import { useTranslation } from 'react-i18next';

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
};

const App: FC<Props> = ({
  chart,
  widget,
  savedQueryName,
  onUpdateChartSettings,
  onUpdateWidgetSettings,
  customizationSections,
}) => {
  const { t } = useTranslation();

  const { headingSettings, formatValues } = customizationSections;

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
      id: 'components',
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
        </Section>
      )}
      {activeMenuItemId === 'formatting' && (
        <Section>
          <FormatSettings
            formattingDisabled={formatValues?.isDisabled}
            formattingNotAvailable={formatValues?.isNotAvailable}
            formatValue={formatValue}
            onUpdateFormatValue={(settings) =>
              onUpdateChartSettings({
                ...chart,
                formatValue: settings,
              })
            }
          />
        </Section>
      )}
      {activeMenuItemId === 'components' && (
        <Section>
          <ComponentSettings
            chartSettings={chart}
            widgetSettings={widget}
            onUpdateWidgetSettings={onUpdateWidgetSettings}
            onUpdateChartSettings={onUpdateChartSettings}
          />
        </Section>
      )}
    </Layout>
  );
};

export default App;
