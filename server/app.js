const express = require('express');
const init = require('./init');

const app = express();

app.set('port', process.env.PORT || 5000);

init(app);

module.exports = app;
