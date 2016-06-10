var Email = require('email').Email;
//var	fs = require('fs').readFile;

module.exports = function(app){

	function sendemail(data, email){

		var myMsg = new Email({
			from: 'Unveil@unveil.com',
			to:   email,
			subject: data.name + " à une grande nouvelle à t'annoncer",
			bodyType: "html",
			body: '<table><tr><td><h1 style="color: red">HTML body</h1><a href="'+data.url+'/event?email='+email+'">Clique ici</a></td></tr></table>'
			//body : read('./views/invite.html', function(err, data) {
			//	console.log(data);
			// })
		});
		myMsg.send();
	}

	return {
		post : function(data) {

			for (var i = 0; i < data.attendees.length; i++) {
				sendemail(data, data.attendees[i]);
			}
		}
	}
}





