const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const argv = require('minimist')(process.argv.slice(2));
const cors = require('cors');
const mysql = require('mysql2');

// CONTROLLERS
const usersCtrl = require('./controllers/users');

//CORS
app.use(
	cors({
		credentials: true,
		origin: true
	})
);
app.options('*', cors());

// SWAGGER
const subpath = express();
app.use(
	bodyParser.json({
		limit: '50mb'
	})
);
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true
	})
);
app.use('', subpath);
const swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('swagger'));
swagger.setApiInfo({
	title: 'CRUD API',
	description: 'CRUD API Description',
	termsOfServiceUrl: '',
	contact: '<your email here>',
	license: '',
	licenseUrl: ''
});
// Set api-doc path
swagger.setAppHandler(app);
swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
const domain = 'localhost';
if (argv.domain !== undefined)
{
	domain = argv.domain;
}

else
{
	console.log('No --domain=xxx specified, taking default hostname "localhost".');
}

// Configure the API port
const port = 8080;
if (argv.port !== undefined)
{
	port = argv.port;
}

else 
{
	console.log('No --port=xxx specified, taking default port ' + port + '.');
}
// Set and display the application URL
const applicationUrl = 'http://' + domain + ':' + port;
swagger.configure(applicationUrl, '1.0.0');

// MYSQL
app.use(function(req, res, next) {
	res.locals.connection = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: 'Douglas123@',
		database: 'swegger_crud',
		timezone: 'UTC+0'
	});
	next();
});
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/swagger/index.html');
});
app.use('/api/v1/users', usersCtrl);

app.listen(3000, function() {
	console.log('server running on port 3000', '');
});

app.set('view engine', 'ejs');
