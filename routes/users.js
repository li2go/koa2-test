import returnObject from '../lib/common/returnObject';
import User from '../business/User';

var router = require('koa-router')();

router.get('/', async function (ctx, next) {
	let user = new User();
	returnObject(ctx, await user.getUsers());
});

router.post('/', async function(ctx, next) {
	let user = new User();
	returnObject(ctx, await user.addUser(ctx.request.body));
});

router.post('/:userId/role', async function(ctx, next) {
	let user = new User();

	let userId = ctx.params.userId;
	let roleData = ctx.request.body;

	returnObject(ctx, await user.addRole(userId, roleData));
});

router.post('/:userId/roles', async function(ctx, next) {
	let user = new User();

	let userId = ctx.params.userId;
	let roleDatas = ctx.request.body;

	returnObject(ctx, await user.addRoles(userId, roleDatas));
});

router.post('/:userId/info', async function(ctx, next) {
	let user = new User();

	let userId = ctx.params.userId;
	let infoData = ctx.request.body;

	returnObject(ctx, await user.addInfo(userId, infoData));
});

router.post('/:userId/infos', async function(ctx, next) {
	let user = new User();

	let userId = ctx.params.userId;
	let infoDatas = ctx.request.body;

	returnObject(ctx, await user.addInfos(userId, infoDatas));
});

router.delete('/:userId', async function(ctx, next) {
	let user = new User();

	returnObject(ctx, await user.deleteUser(ctx.params.userId));
});

module.exports = router;
