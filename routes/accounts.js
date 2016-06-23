import returnObject from '../lib/common/returnObject';
import Account from '../business/Account';

var router = require('koa-router')();

router.get('/', async function (ctx, next) {
	let account = new Account();

	returnObject(ctx, await account.getAccount());
});

router.post('/create', async function(ctx, next) {
	let account = new Account();
	returnObject(ctx, await account.addAccount(ctx.request.body));
});

module.exports = router;
