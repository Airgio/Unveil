var express = require('express');

module.exports = function(app){

	return {
		create : function(exp){

			var _routes = app.config.routes;

			for(var i = 0; i < _routes.length; i++){
				(function(_r){
					var _method = _r.method ? _r.method : 'get';

					exp[_method](_r.path, function(req, res){
						res.sendFile(app.root + '/views/' + _r.view + '.html');
					});
				})(_routes[i])
			}

			//static files
			exp.use('/assets', express.static(app.root + '/assets'));
		}




	}
}