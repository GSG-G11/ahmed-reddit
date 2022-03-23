const express = require('express');
const apis = require('./apis');
const pages = require('./pages');
const { handleErrorServer, handleErrorNotFound } = require('../controller');

const router = express();

// --------------------    apis    -----------
router.use('/api/v1', apis);

// -------------------- pages    -----------
router.use('/', pages);

// -------------------- Handle Error ---------------------
router.use(handleErrorNotFound);
router.use(handleErrorServer);

module.exports = router;
