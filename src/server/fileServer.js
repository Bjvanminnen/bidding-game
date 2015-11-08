import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import Html from '../Html';
import { getActiveStore } from './storeManager';

import * as socketServer from './socketServer';

const app = express();

const PORT = process.env.PORT || 3000;

const JS_HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

// TODO - this should be pointing at a local path if prod
var assets = {
  javascript: {
    main: `${JS_HOST}/js/bundle.js`
  }
};

app.use('/js', express.static(__dirname + '/../../dist'));

app.get('/', (req, res) => {
  const html = <Html store={getActiveStore()} assets={assets}/>
  res.send('<!doctype html>\n' + ReactDOM.renderToString(html));
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`App listening at http://${host}:${port}`);
});
