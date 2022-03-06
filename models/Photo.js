// Photo model

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('Album');   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
		users() {
			return this.belongsTo('User');
		}
	}, {
		async fetchById(id) {
			return await new this({ id }).fetch();
		}
	});
}