const express = require('express');
const router = express.Router();
const { getReligionMaster } = require('../controllers/masterController');

router.get('/religion/list', getReligionMaster);

module.exports = router;
