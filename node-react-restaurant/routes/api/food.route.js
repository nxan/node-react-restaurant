const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Food route'));

module.exports = router