path = require("../data");

let conn = require("../config/db");
class Indice {
	static create (txt, cb) {
		conn.query('INSERT INTO indice set text = ?', [txt], (err, res) => {
			if(err) throw err;
			cb(res);
		});
	}
}
module.exports = Message;