import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';

// Automatically pass transactions to all queries
var namespace = cls.createNamespace('my-trasation-namespace');
Sequelize.cls = namespace;

export default new Sequelize('test', 'root', '123456', {
	host: '127.0.0.1',
	port: '3306',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});