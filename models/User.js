const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		albums() {
			return this.hasMany('Albums');
		},
		photos() {
			return this.hasMany('Photos');
		}
	}, {
		async fetchById(id) {
			return await new this({ id }).fetch();
		}
	});
};