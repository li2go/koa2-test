import Hello from '../business/Hello';
import returnObject from '../lib/common/returnObject';

var router = require('koa-router')();

router.get('/', async function (ctx, next) {
 	let h = new Hello('koa2');

	returnObject(ctx, h.hello());
});

module.exports = router;