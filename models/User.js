const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos() {
			return this.hasMany('Photos');
		},
		albums() {
			return this.hasMany('Albums');
		}
	}, {
		async login (username, password) {
			// find user based on username (bail if no such user exists)
			const user = await new this({ username }).fetch({ require: false });
			
			if (!user) {
				return false
			}

			const hash = user.get('password');

			// hash the incoming cleartext password using the salt from the db and compare if the generated hash matches the db-hash
			const result = await bcrypt.compare(password, hash);
			
			if (!result) {
				return false
			}

			// all is well, return user
			return user;
		}
	});
};