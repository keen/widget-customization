import React from 'react';
import ReactDOM from 'react-dom';

import WidgetCustomization from '../src/WidgetCustomization';

class App extends React.Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WidgetCustomization />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
