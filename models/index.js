import User from './User';
import Account from './Account';
import UserRole from './UserRole';
import Role from './Role';
import Info from './Info';

// 一对一
User.hasOne(Account, {onDelete: 'cascade'});
Account.belongsTo(User);

// 多对多
User.belongsToMany(Role, {through: UserRole});
Role.belongsToMany(User, {through: UserRole});

// 一对多
User.hasMany(Info, {onDelete: 'cascade'});
Info.belongsTo(User);

export default {
	user: User,
	account: Account,
	userRole: UserRole,
	role: Role,
	info: Info
};