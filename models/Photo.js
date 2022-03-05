// Photo model

 module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		author() {
			return this.belongsTo('Album');   // books.author_id = 3   ->   authors.id = 3 (single author)
		},
		users() {
			return this.belongsToMany('User');
		}
	});
}