path = require("../data");

let conn = require("../config/db");
class Capchat {
	static create (fields, cb) {
		let values = [fields];
		let sql = 'INSERT INTO capchat (title, theme) VALUES  ?';
		 
		try {
			conn.query(
				sql, 
				[values.map(field => [field.titre, field.theme])],
				(err, res) => {
					if(err) throw err;
					cb(res);
				}
			);	
		}catch (err) {
			console.log("Erreur d'insertion dans la table capchat!")
			console.log(err);
		}
	}
}
module.exports = Capchat;
