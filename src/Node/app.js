var express = require('express'); 
var bodyParser = require('body-parser'); 

var app = express(); 
app.use(bodyParser.json()); // pour supporter json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //  pour supporter encoded url 
 
app.get('/', function(req, res) {     
	res.setHeader("Content-Type", "application/json; charset=utf-8");     
	res.send('Vous êtes à l\'entrée'); 
}); 
  
app.post('/newcontact', function(req, res) {     
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	console.log('json body: ' + JSON.stringify(req.body, null, "  "));
	res.status(200).end(JSON.stringify(req.body, null, "  "))
}); 

app.use(express.static('forms')); 
app.use('/asset', express.static('public')); 

app.use(function(req, res, next) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.status(404).send('Lieu inconnu :'+req.originalUrl);
}); 

app.listen(8080); 