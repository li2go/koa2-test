import uuid from 'node-uuid';
import Sequelize from 'sequelize';
import sequelize from '../lib/common/sequelize';

var Role = sequelize.define('role', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING
    }
}, {
    paranoid: true,
    freezeTableName: true,
    hooks: {
		beforeCreate: function(role, options) {
			role.id = uuid.v1();
		},

        beforeBulkCreate: function(roles, fields) {
            roles.forEach(function(role) {
                role.id = uuid.v1();
            });
        }
    }
});

export default Role;