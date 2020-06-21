let fs = require('fs');
let { join } = require('path');
let unzipper = require('unzipper');
let stream = require('stream');


checkCreateFolder = (path) => {
		try {
		    fs.statSync(path);
		  } catch (e) {
		    if (e && e.code == 'ENOENT') {
		      console.log('The uploads folder doesn\'t exist, creating a new one...');
		      try {

		        fs.mkdirSync(path, {recursive: true});
						//fs.mkdirSync(join(path, 'neutres'));
						//fs.mkdirSync(join(path, 'singuliers'));
		        
		      } catch (err) {
		        console.log('Error creating the uploads folder 1');
		        return false;
		      }
		    } else {
		      console.log('Error creating the uploads folder 2');
		      return false;
		    }
		  }
		  return true;
}

/*cree les dossier :   
	entry.pipe(fs.mkdir(fileName, {recursive: true}, (err) => {
						  if (err) throw err; 
						}));
*/

zipManager = (zip, outputPath) => {
	console.log(zip);
	unzipper.Open.file(zip.path)
  .then(d => d.extract({path: outputPath}));
}

class imgManager {

	//recuperer le titre et le 
	static setAssets(capchat, zips) {
		var op = join(__dirname, '..', 'public', capchat.theme, capchat.titre);//outputPath
		//if(checkCreateFolder(op))
			Object.keys(zips).forEach((key) => {//permet de renomer tous les fichier uploadés pour ajouter le
            let zip = zips[key];
            zipManager(zip, op);
			});
		
	}
}
module.exports = imgManager;
