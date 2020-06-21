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

		        fs.mkdir(path, {recursive: true}, (err) => {
						  if (err) throw err; 
						});
		        
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
	/*fs.createReadStream(zip)
  .pipe(unzipper.Parse())
  .on('entry', function (entry) {
    const fileName = entry.path;
    //const fileName = entry.path.replace(/([' '])/gm, '_');
    const type = entry.type; // 'Directory' or 'File'
    const size = entry.vars.uncompressedSize; // There is also compressedSize;
    console.log(fileName);
    if (type === 'Directory') {
      entry.pipe(fs.createWriteStream(outputPath));
    } else {
      entry.autodrain();
    }
  });*/
  try {	
		fs.createReadStream(zip.path)
	  .pipe(unzipper.Parse())
	  .pipe(stream.Transform({
	    objectMode: true,
	    transform: function(entry,e,cb) {
	      const fileName = entry.path.replace(/([' '])/gm, '_');
	      const type = entry.type; // 'Directory' or 'File'
	      const size = entry.vars.uncompressedSize; // There is also compressedSize;
	      const path = join(outputPath, fileName);
	      
	      if (type === 'Directory') {
	        entry.pipe(fs.createWriteStream(path))
	          .on('finish',cb);
	 
	      } else {
	      	console.log(fileName);
	        entry.autodrain();
	        cb();
	      }
	    }
	  }));
	} catch(err){
	  console.log(err);
	}
}

class imgManager {

	//recuperer le titre et le 
	static setAssets(capchat, zips) {
		var op = join(__dirname, '..', 'public', capchat.theme, capchat.titre);//outputPath
		if(checkCreateFolder(op))
			Object.keys(zips).forEach((key) => {//permet de renomer tous les fichier uploadés pour ajouter le
            let zip = zips[key];
            zipManager(zip, op);
			});
	}
}
module.exports = imgManager;
