module.exports = function(app){

	return {
		create : function(exp){

			var _routes = app.config.routes;

			for(var i = 0; i < _routes.length; i++){
				(function(_r){
					exp.get('/', function(req, res){
						res.sendFile(app.root + '/views/' + _r.view + '.html');
					});
				})(_routes[i])
			}
		}
	}
}