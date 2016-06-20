module.exports = function(app){
	return {
		send : function(data){
			console.log(data);

            app.socket.io.to(data.room).emit('receive', data);
		}
	}
}