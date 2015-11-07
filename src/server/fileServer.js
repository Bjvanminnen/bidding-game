import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import Html from '../Html';
import { getActiveStore } from './storeManager';

// import * as socketServer from './index';

const app = express();

var PORT = process.env.PORT || 3000;

var assets = {
  javascript: {
    main: 'http://localhost:3001/static/bundle.js'
  }
};

app.use('/js', express.static(__dirname + '/../../dist'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/server-index.html', (req, res) => {
  const html = <Html store={getActiveStore()} assets={assets}/>
  res.send('<!doctype html>\n' + ReactDOM.renderToString(html));
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
