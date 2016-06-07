module.exports = function(app){
	return {
		send : function(msg){
			app.socket.io.emit('receive', msg);
		}
	}
}