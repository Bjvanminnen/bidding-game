import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React from 'react';

export default class MyDevTools extends React.Component {
  render() {
    const { store } = this.props;
    const style = {
      fontSize: 14,
      right: this.props.right
    };

    return (
      <div>
        <DebugPanel style={style} top right bottom>
          <DevTools store={store} monitor={LogMonitor} visibleOnLoad={true} />
        </DebugPanel>
      </div>
    );
  }
}
