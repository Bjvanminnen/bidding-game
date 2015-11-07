import React from 'react';

export default class extends React.Component {
  render() {
    const { store } = this.props;
    const initialState = JSON.stringify(store.getState());
    return (
      <html>
        <head>
          <title>Bidding Game</title>
        </head>
        <body>
          <div id='root'/>
          <script dangerouslySetInnerHTML={{__html: `window.__initialState=${initialState};`}} />
          <script src={this.props.assets.javascript.main} charSet="utf-8"></script>
        </body>
      </html>
    );
  }
}
