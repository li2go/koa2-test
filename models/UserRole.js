import Sequelize from 'sequelize';
import sequelize from '../lib/common/sequelize';

var UserRole = sequelize.define('userRole', {}, {
    paranoid: true,
    freezeTableName: true,
    tableName: "user_role"
});

export default UserRole;