let fs = require('fs');
//------------------------------------------------------------------------------
// Input:   string  - path : Chemin du fichier à lire.
//          char - ign : Charactère ignorer
//          int - offset : Le nombre de charactère ignorer à ignorer
// Return:  file_content : tableau du contenus des fichier 
// Purpose: Fonction qui sert à lire un fichier par tranche tranche par tranche en fonction d'un charactère recurant
//------------------------------------------------------------------------------
//Ici la fonction sert à lire ligne par ligne le fichier indices et le met dans un tableau
function readFileContent(path, ign, offset) {
	try{
		var data = fs.readFileSync(path, 'utf8');
	}
	catch(error) {
		console.error("Impossible de lire le fichier");
		return;
	}
	offset = offset * -1 ;
	var buff = "";
	var file_content = new Array();;

	for (var i = 0; i < data.length; i++) { 
		if(data[i] === ign)
			offset++;
		
		if(offset > 0 && !(data[i] === ign)){
			buff += data[i];
			}else if(buff != ""){
				file_content.push(buff);
				buff = "";
			}
	}
	return file_content;
}

console.log(readFileContent('../../singuliers/Indices.txt', "\n", 2));


