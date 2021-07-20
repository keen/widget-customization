import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import WidgetCustomization from '../src/WidgetCustomization';
import { createWidgetSettings } from '../src/utils';
import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from '../src/types';

import createI18n from './i18n';
import { barChart as fixture } from './fixtures';

createI18n();

const App = () => {
  const [
    chartSettings,
    setChartSettings,
  ] = useState<ChartCustomizationSettings>(fixture.chartSettings);
  const [
    widgetSettings,
    setWidgetSettings,
  ] = useState<WidgetCustomizationSettings>(
    createWidgetSettings(fixture.widgetSettings)
  );

  return (
    <>
      <WidgetCustomization
        chartSettings={chartSettings}
        widgetSettings={widgetSettings}
        onUpdateWidgetSettings={(settings) => setWidgetSettings(settings)}
        onUpdateChartSettings={(settings) => setChartSettings(settings)}
        modalContainer="#modal-root"
        savedQueryName="Last purchases"
        customizationSections={{
          headingSettings: {
            isDisabled: null,
          },
          formatValues: {
            isNotAvailable: null,
            isDisabled: null,
          },
          componentSettings: {
            cardSettingsDisabled: false,
          },
        }}
      />
      <section>
        <h5>Chart Settings</h5>
        <pre>{JSON.stringify(chartSettings, null, 2)}</pre>
        <h5>Widget Settings</h5>
        <pre>{JSON.stringify(widgetSettings, null, 2)}</pre>
      </section>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
