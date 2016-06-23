var router = require('koa-router')();

var main = require('./main');
var users = require('./users');
var accounts = require('./accounts');

router.use('/', main.routes(), main.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/accounts', accounts.routes(), accounts.allowedMethods());

module.exports = router;
