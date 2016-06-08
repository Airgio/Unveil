module.exports = function(app){
	return {
		send : function(msg){
			console.log(msg);
			app.socket.io.emit('receive', msg);
		}
	}
}