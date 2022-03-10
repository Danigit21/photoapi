// User model

const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos() {
			return this.hasMany('Photo');
		},
		albums() {
			return this.hasMany('Album');
		}
	}, {
		async login(email, password) {
	
			// find user with specific email
			const user = await new this({ email }).fetch({ require: false });

			if (!user) {
				return false;
			}

			// make a const "hash" with users password
			const hash = user.get('password');
	
			// hash the users password and compare if generated hash matches db-hash
			const result = await bcrypt.compare(password, hash);

			if (!result) {
				return 'Incorrect password', false;
			}
	
			// return the user if success
			return user;
		},

		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}
	});
};