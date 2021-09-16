import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { KeenDataviz } from '@keen.io/dataviz';
import { PubSub } from '@keen.io/pubsub';

import WidgetCustomization from '../src/WidgetCustomization';
import { createWidgetSettings } from '../src/utils';
import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from '../src';

import createI18n from './i18n';
import { metricChart as fixture, tableData } from './fixtures';

createI18n();

const App = () => {
  const [
    chartSettings,
    setChartSettings,
  ] = useState<ChartCustomizationSettings>(
    fixture.chartSettings as ChartCustomizationSettings
  );
  const [
    widgetSettings,
    setWidgetSettings,
  ] = useState<WidgetCustomizationSettings>(
    createWidgetSettings(fixture.widgetSettings)
  );

  const datavizRef = useRef(null);
  const visualizationContainer = useRef(null);

  const pubSub = new PubSub();

  useEffect(() => {
    datavizRef.current = new KeenDataviz({
      container: visualizationContainer.current,
      type: 'table',
      eventBus: pubSub,
      inEditMode: true,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'hourly',
        },
      },
      settings: {
        formatValue: {
          author: 'EEE${datetime;YYYY-MM-DD;hidden}',
        },
        margins: { top: 30, left: 45, right: 30, bottom: 60 },
      },
    });
    datavizRef.current.render(tableData);
  }, [chartSettings, widgetSettings]);

  return (
    <>
      <div ref={visualizationContainer} />
      <WidgetCustomization
        widgetType="metric"
        pubSub={pubSub}
        chartSettings={chartSettings}
        widgetSettings={widgetSettings}
        onUpdateWidgetSettings={(settings) => setWidgetSettings(settings)}
        onUpdateChartSettings={(settings) => setChartSettings(settings)}
        onMenuItemChange={(currentMenuItemId) => console.log(currentMenuItemId)}
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
            isDisabled: null,
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
