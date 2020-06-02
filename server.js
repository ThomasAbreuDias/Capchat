//Modules require 
let http = require('http');
let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();
//moteur template
app.set('view engine', 'ejs');

//middlewares
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: 'clet',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(require('./middlewares/flash'));
//routes
app.get('/',
  (req, res) => {
    console.log(req.session);
    res.render('pages/index');
  }
);

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
