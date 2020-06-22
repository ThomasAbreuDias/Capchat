let Promise = require("bluebird");
let fs = Promise.promisifyAll(require("fs"));
let { join } = require('path');
let { basename } = require('path');
let unzipper = require('unzipper');
let stream = require('stream');
let conn = require("../config/db");

zipManager = (zip, outputPath) => {
	return unzipper.Open.file(zip.path).then(
		d => {
				try {
					d.extract({path: outputPath});
				} catch(e) {
					console.log("c la ");
				}
		});
};
insertImg = (files, path, idCapchat) => {

	Object.keys(files).forEach((key) => {
		let file = files[key];
		const val = [join(path,file), idCapchat];
		if(basename(path) == "neutres") {
			console.log(val);
			conn.query(
				'INSERT INTO img_neutre (path, id_cap) VALUES  (?,?)',
				[join(path,file), idCapchat],
				(err, res) => {
					if(err) throw err;
					console.log(res);
				});
		} else if(basename(path) == "singuliers") {
			if(file.split('.').pop() == 'txt') {

			} else {
				conn.query(
				'INSERT INTO img_singulier (path, id_cap) VALUES  (?,?)',
				[join(path,file), idCapchat],
				(err, res) => {
					if(err) throw err;
					console.log(res);
				});
			}
		}
	});

	//console.log( basename(join(img.path, '..')) );//type d'img singulier ou neutre
};

cleanBeforeInsert = (path, idCapchat) => { //fonctionne 1 fois sur 6 besoin d'un debeugeur !
	fs.readdirAsync(path).then(function (file) {
		try {
			insertImg(file, path, idCapchat);
		} catch(e) {

		}
    
	});
};

class imgManager {
	//recuperer le titre et le 
	static setAssets(capchat, zips) {
		var op = join(__dirname, '..', 'public', capchat.theme, capchat.titre);//outputPath
		Object.keys(zips).forEach((key) => {
			let zip = zips[key];
			zipManager(zip, op);
			conn.query(
					"SELECT @@IDENTITY AS 'Id'", 
					(err, res) => {
						if(err) throw err;
						res.forEach((field) => {
							if (zip.name == 'singuliers.zip') 
								cleanBeforeInsert(join(op, 'singuliers'), `${field.Id}` );
							if (zip.name == 'singuliers.zip') 
								cleanBeforeInsert(join(op, 'neutres'), `${field.Id}`);
						});
					}
				);
		});
	}
}
module.exports = imgManager;



//
/* /! fonctionne 1 fois sur 6 besoin d'un debeugeur !\
cleanBeforeInsert = async (path, idCapchat) => { 

	console.log(path);
	console.log(idCapchat);
		
			//trouver une verif pour eviter la duplication,
			//incrire dans la base,
	 await fs.readdirAsync(path).map(function (file) {
		let reg = /([' '])/gm;
		let op = join(path, file);
		let np = join(path, file.replace(reg, '_'));
    return fs.renameAsync(op, np);
	}).then(function (content) {
				console.log(content);
				//insertImg([join(path,file), idCapchat]);
	});
};
*/