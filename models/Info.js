import uuid from 'node-uuid';
import Sequelize from 'sequelize';
import sequelize from '../lib/common/sequelize';

var Info = sequelize.define('info', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },

    nickname: {
        type: Sequelize.STRING
    }
}, {
    paranoid: true,
    freezeTableName: true,
    hooks: {
		beforeCreate: function(info, options) {
			info.id = uuid.v1();
		},

        beforeBulkCreate: function(infos, fields) {
            infos.forEach(function(info) {
                info.id = uuid.v1();
            });
        }
    }
});

export default Info;