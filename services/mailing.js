var Email = require('email').Email,
	fs = require('fs'),
	mail_file = app.root + '/views/mail.html';

module.exports = function(app){
	function sendemail(dest, name, lien){
		var myMsg = new Email({ 
			from: 'join@unveil.com',
			to:   dest,
			subject: name + "à une grande nouvelle à t'annoncer",
			bodyType: "html",
			body: '<table><tr><td><h1 style="color: red">HTML body</h1><a href"'+ lien +'">Clique ici</a></td></tr></table>'
		});
		myMsg.send(function(err){ '...' });
	}

	return {
		send : function(emails){
			for(var i=0; i<emails.length; i++){
				sendemail(emails[i]);
			}
		}
	}
}





