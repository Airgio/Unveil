module.exports = function(app){
	return {
		session : function(data){
			console.log(data);
/*			app.socket.io.emit('userdata', data);
*/		}
	}
}