const express = require('express');
const init = require('./init');

const app = express();

app.set('port', process.env.PORT || 3000);

init(app);

module.exports = app;
