import sequelize from '../lib/common/sequelize';
import model from '../models';
import returnNext from '../lib/common/returnNext';
import {formatCreateData} from '../lib/common/sequelizeUtil';

export default class User {
	async getUsers() {
		let users = await model.user.findAll({
			include: [{
				model: model.account
			}, {
				model: model.role
			}, {
				model: model.info
			}]
		});

		return returnNext(null, 200, users);
	}

	async addUser(data) {
		// Managed transactions handle committing or rolling back the transaction automagically
		try {
			let results = await sequelize.transaction(async function(t) {
				let user = await model.user.create(data);
				let account = await model.account.create({amount: 0});
				// throw new Error();
				await user.setAccount(account);
				return new Promise(function(resolve, reject) {
					resolve({test: 'test'});
				});
			});

			return returnNext(null, 200, results);
		} catch(err) {
			return returnNext(null, 500, {});
		}

		// Unmanaged transactions force you to manually rollback or commit the transaction
		// let t = await sequelize.transaction();
		// try {
		// 	let user = await model.user.create(formatCreateData(data), {trasaction: t});
		// 	let account = await model.account.create(formatCreateData({amount: 0}), {trasaction: t});
		// 	throw new Error();
		// 	await user.setAccount(account, {trasaction: t});
		// } catch(err) {
		// 	await t.rollback();
		// 	return returnNext(null, 200, {});
		// }

		// return returnNext(null, 200, await t.commit());
	}

	async deleteUser(userId) {
		try {
			let results = await sequelize.transaction(async function(t) {
				return new Promise(async function(resolve, reject) {
					try {
						let user = await model.user.findOne({
							include: [{
								model: model.account
							}],
							where: {
								id: userId
							}
						});

						await user.account.destroy();
						await user.destroy();

						resolve('success');
					} catch(err) {
						reject(err);
					}

				});
			});

			return returnNext(null, 200, results);
		} catch(err) {
			return returnNext(null, 500, null);
		}
	}

	async addRole(userId, roleData) {
		let user = await model.user.findById(userId);
		let role = await model.role.create(formatCreateData(roleData));

		return returnNext(null, 200, await user.addRole(role));
	}

	async addRoles(userId, roleDatas) {
		let user = await model.user.findById(userId);
		let roles = [];

		for(let i = 0; i < roleDatas.length; i++) {
			let role = await model.role.create(formatCreateData(roleDatas[i]));
			roles.push(role);
		}

		return returnNext(null, 200, await user.setRoles(roles));
	}

	async addInfo(userId, infoData) {
		let user = await model.user.findById(userId);
		let info = await model.info.build(formatCreateData(infoData)).save();

		return returnNext(null, 200, await user.addInfo(info));
	}

	async addInfos(userId, infoDatas) {
		let user = await model.user.findById(userId);
		let infos = [];

		for(let i = 0; i < infoDatas.length; i++) {
			let info = await model.info.build(formatCreateData(infoDatas[i])).save();
			infos.push(info);
		}

		return returnNext(null, 200, await user.addInfos(infos));
	}
}