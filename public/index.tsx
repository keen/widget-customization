import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PickerWidgets } from '@keen.io/widget-picker';

import WidgetCustomization from '../src/WidgetCustomization';

import createI18n from './i18n';
import { lineChart as fixture } from './fixtures';

createI18n();

const App = () => {
  const [widgetType, setWidgetType] = useState<PickerWidgets>('line');

  const [chartSettings, setChartSettings] = useState<Record<string, any>>(
    fixture.chartSettings
  );
  const [widgetSettings, setWidgetSettings] = useState<Record<string, any>>(
    fixture.widgetSettings
  );

  return (
    <>
      <h4>{widgetType}</h4>
      <section>
        <button onClick={() => setWidgetType('table')}>table</button>
        <button onClick={() => setWidgetType('metric')}>metric</button>
        <button onClick={() => setWidgetType('line')}>line</button>
        <button onClick={() => setWidgetType('heatmap')}>heatmap</button>
        <button onClick={() => setWidgetType('choropleth')}>choropleth</button>
        <button onClick={() => setWidgetType('bar')}>bar</button>
      </section>
      <section>
        <h5>Chart Settings</h5>
        <pre>{JSON.stringify(chartSettings)}</pre>
        <h5>Widget Settings</h5>
        <pre>{JSON.stringify(widgetSettings)}</pre>
      </section>
      <WidgetCustomization
        widgetType={widgetType}
        chartSettings={chartSettings}
        widgetSettings={widgetSettings}
        onUpdateWidgetSettings={(settings) => setWidgetSettings(settings)}
        onUpdateChartSettings={(settings) => setChartSettings(settings)}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
