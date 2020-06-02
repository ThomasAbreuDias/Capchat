let conn = require("../config/db");
class Message {
	static create (title, cb) {
		conn.query('INSERT INTO capchat set title = ?', [title], (err, res) => {
			if(err) throw err;
			cb(res);
		});
	}
}
module.exports = Message;