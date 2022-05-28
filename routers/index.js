const router = require('express').Router();
require('../data/sparql');

router.get('/', (req, res) => {
  res.render('index', { title: 'Hello World' });
});

module.exports = router;
