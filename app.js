var config = require('config');

var app = {
	root: __dirname,
	config : config
};

app.server = require('./drivers/server')(app);
app.routes = require('./drivers/routes')(app);
app.socket = require('./drivers/socket')(app);


app.messenger = require('./services/messenger')(app);

app.server.create();

console.log(app.config);
/*
	var app = require('express')();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);

	io.on('connection', function(socket){
		// socket is for each user
		console.log('user connected');

		// if a user is disconnected
		socket.on('disconnect', function(){
			console.log('User disconnected')
		});

		// receive message
		socket.on('send', function(msg){
			io.emit('receive', msg);
			console.log(msg);
		});
	})


	app.get('/', function(req, res){
		res.sendFile(__dirname+'/index.html');
	})

	http.listen(3000, function(){
		console.log('listening on *:3000');
	})
*/
