var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');var routes = require('./routes');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'view'));
// app.set('view engine', 'angular');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res, next) => { 
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if(app.get('env') === 'development') { 
	app.use((err, req, res, next) => { 
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

if(app.get('env') === 'production') { 
	app.use((err, req, res, next) => { 
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	});
}

module.exports = app;







