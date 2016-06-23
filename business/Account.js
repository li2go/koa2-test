import model from '../models';
import returnNext from '../lib/common/returnNext';
import {formatCreateData} from '../lib/common/sequelizeUtil';

export default class User {
	async getAccount() {
		console.log(typeof model.user);
		let accounts = await model.account.findAll({
			include: [{
				model: model.user
			}]
		});

		return returnNext(null, 200, accounts);
	}

	async addAccount(data) {
		let account = await model.account.create(data);

		return returnNext(null, 200, account);
	}
}