import React from 'react';
import { getClientFilteredState } from './redux/serverReducer';

export default class extends React.Component {
  render() {
    const { store, assets, pid } = this.props;
    const state = store.getState();
    const filteredState = getClientFilteredState(store.getState(), pid);
    const initialState = JSON.stringify(filteredState);
    return (
      <html>
        <head>
          <title>Bidding Game</title>
        </head>
        <body>
          <div id='root'/>
          <script dangerouslySetInnerHTML={{__html: `window.__initialState=${initialState};`}} />
          <script src={assets.javascript.main} charSet="utf-8"></script>
        </body>
      </html>
    );
  }
}
