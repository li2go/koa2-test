import uuid from 'node-uuid';
import Sequelize from 'sequelize';
import sequelize from '../lib/common/sequelize';

var Account = sequelize.define('account', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },

    amount: {
        type: Sequelize.DECIMAL(10, 2)
    }
}, {
    paranoid: true,
    freezeTableName: true,
    hooks: {
		beforeCreate: function(account) {
			account.id = uuid.v1();
		},

        beforeBulkCreate: function(accounts, fields) {
            accounts.forEach(function(account) {
                account.id = uuid.v1();
            });
        }
    }
});

export default Account;