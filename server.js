//Modules require 
let http = require('http');
let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
let formidable = require('formidable');
let { join } = require('path');
let app = express();

//moteur template
app.set('view engine', 'ejs');

//middlewares
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
  secret: 'clef',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(require('./middlewares/flash'));

//routes
app.get('/',
  (req, res) => {
    //console.log(req.session);
    res.render('pages/index');
  }
  );
function checkCreateUploadsFolder (uploadsFolder) {
  try {
    fs.statSync(uploadsFolder)
  } catch (e) {
    if (e && e.code == 'ENOENT') {
      console.log('The uploads folder doesn\'t exist, creating a new one...')
      try {
        fs.mkdirSync(uploadsFolder)
      } catch (err) {
        console.log('Error creating the uploads folder 1')
        return false
      }
    } else {
      console.log('Error creating the uploads folder 2')
      return false
    }
  }
  return true
}
//posts
app.post('/upload',
  (req, res, next) => {
    let form = formidable.IncomingForm();
    const uploadsFolder = join(__dirname, 'uploads');
    form.uploadDir = uploadsFolder;//usless ?
    form.multiples = false;
    form.maxFileSize = 50 * 1024 * 1024; // 50 MB
    const folderCreationResult = checkCreateUploadsFolder(uploadsFolder);
    if (!folderCreationResult) 
      return res.json({ok: false, msg: "The uploads folder couldn't be created"});
  
    form.parse(req, (err, fields, files) => {
      if(fields.titre === undefined || fields.titre === '') {
        req.flash("error","Vous n'avez donné aucun titre !");
        res.redirect('/');
      }else if(fields.theme === undefined || fields.theme === '') {
        req.flash("error","Vous n'avez donné aucun thème !");
        res.redirect('/');
      } else {
        let capchat = require("./models/capchat");
          capchat.create(fields, function () { 
          req.flash("success", "Merci pour votre participation !");
        });
        if(files.neutres.size === 0 || files.singuliers.size === 0 ) {
          req.flash("error","Veuillez fournir une archive valide !");
          res.redirect('/');  
        } else {
          Object.keys(files).forEach((key) => {//permet de renomer tous les fichier uploadés pour ajouter le
            let file = files[key];
            if(files.neutres.size != 0 && files.singuliers.size != 0){
              renameZip(file, join(uploadsFolder,file.name));
            }
          });

          res.json({ fields, files });
        }
      }
    });  
  }
);

function renameZip(file, newpath) {
  let oldpath = file.path;
  fs.renameSync(oldpath, newpath, (err) => {
    if (err) throw err;
    console.log(file.name+" renamed\n");
  }); 
}

app.post('/', (req, res) => { 
    if(req.body.Titre_capchat === undefined || req.body.Titre_capchat === '') {
      req.flash("error","Vous n'avez donné aucun titre !");
      res.redirect('/');
    }else {
      let message = require("./models/message");
      message.create(req.body.Titre_capchat, function () { 
        req.flash("success", "Merci pour votre participation !");
        res.redirect('/');
      });
    }
});

app.listen(8080);
