import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Bidding Game</title>
        </head>
        <body>
          <div id='root'/>
          <script src="/js/bundle.js" charSet="utf-8"></script>
        </body>
      </html>
    );
  }
}
