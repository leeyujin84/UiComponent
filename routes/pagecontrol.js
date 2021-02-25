var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pagecontrol/index', { title: 'PageControlExample' });
});

router.get('/page1', function(req, res, next) {
    res.render('pagecontrol/page1', { title: 'page1' });
});
router.get('/page2', function(req, res, next) {
    res.render('pagecontrol/page2', { title: 'page2' });
});
router.get('/page3', function(req, res, next) {
    res.render('pagecontrol/page3', { title: 'page3' });
});


module.exports = router;
