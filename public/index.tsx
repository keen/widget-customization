import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import WidgetCustomization from '../src/WidgetCustomization';

import { lineChart as fixture } from './fixtures';

const App = () => {

  const [chartSettings, setChartSettings] = useState<Record<string, any>>(fixture.chartSettings);
  const [widgetSettings, setWidgetSettings] = useState<Record<string, any>>(fixture.widgetSettings);

    return (
      <>
      <section>
      <h5>Chart Settings</h5>
      <pre>
        {JSON.stringify(chartSettings)}
      </pre>
      <h5>Widget Settings</h5>
      <pre>
        {JSON.stringify(widgetSettings)}
      </pre>
      </section>
      <WidgetCustomization
        widgetType="line"
        chartSettings={chartSettings}
        widgetSettings={widgetSettings}
        onUpdateWidgetSettings={(settings) => setWidgetSettings(settings)}
        onUpdateChartSettings={(settings) => setChartSettings(settings)}
      />
      </>
    );

}

ReactDOM.render(<App />, document.getElementById('root'));
