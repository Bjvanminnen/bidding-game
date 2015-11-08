import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import Html from '../Html';
import { getActiveStore } from './storeManager';

import * as socketServer from './socketServer';

const app = express();

const PORT = process.env.PORT || 3000;

const JS_HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

var assets = {
  javascript: {
    main: `${JS_HOST}/js/bundle.js`
  }
};

app.use('/js', express.static(__dirname + '/../../dist'));

app.get('/', (req, res) => {
  let pid = req.query.pid || 1;

  const html = <Html store={getActiveStore()} assets={assets} pid={pid}/>
  res.send('<!doctype html>\n' + ReactDOM.renderToString(html));
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`App listening at http://${host}:${port}`);
});
