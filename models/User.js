// User model

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		albums() {
			return this.hasMany('Album');
		},
		photos() {
			return this.hasMany('Photo');
		}
	}, {
		async fetchById(id) {
			return await new this({ id }).fetch();
		}
	});
};