//Modules require 
let http = require('http');
let express = require('express');
let fs = require('fs');

let app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));
app.get('/',
  (req, res) => {
    res.render('pages/index', {name: 'bill'});
  }
);


app.listen(8085);
