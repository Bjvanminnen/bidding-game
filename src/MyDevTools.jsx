import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React from 'react';

export default class MyDevTools extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} visibleOnLoad={true} />
        </DebugPanel>
      </div>
    );
  }
}
