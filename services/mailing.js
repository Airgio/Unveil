var Email = require('email').Email;
//var	fs = require('fs').readFile;

module.exports = function(app){

	function sendemail(data, email){

		var myMsg = new Email({
			from: 'Unveil@unveil.com',
			to:   email,
			subject: data.name + " à une grande nouvelle à t'annoncer",
			bodyType: "html",
			body: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <title>A Simple Responsive HTML Email</title> <style type="text/css">@media only screen and (min-device-width: 601px){.content{width: 600px !important;}}</style> </head> <body yahoo bgcolor="#222222" style="margin: 0; padding: 0; min-width: 100%!important;"> <table width="100%" bgcolor="#222222" border="0" cellpadding="0" cellspacing="0"> <tr> <td><!--[if (gte mso 9)|(IE)]><table width="600" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td><![endif]--> <table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px;"> <tr> <td> <table cellpadding="0" cellspacing="0" border="0" width="100%" align="center"> <tr> <td align="center" style="padding-top:20px; padding-bottom:10px;"> <a href="'+data.url+'/event?email='+email+'" target="_blank"><img src="http://media.mnlk.org/newsletters/unveil/mail_logo.png" alt="Unveil" color="#04e1af" width="60%"/></a> </td></tr><tr> <td align="center"> <a href="'+data.url+'/event?email='+email+'" target="_blank" style="color:#FFFFFF; font-family:Arial, sans-serif; text-decoration:none; font-size:14px; letter-spacing:1px">FAITES LEVER LE VOILE SUR VOS SECRETS</a> </td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%"> <tr> <td align="center" style="padding-top:50px;"> <font style="color:#FFFFFF; font-family:Arial, sans-serif; text-decoration:none; font-size:18px;"><font style="text-transform:uppercase; font-size:22px;">'+data.name+'</font><br/>&agrave; une grande nouvelle &agrave; t&rsquo;annoncer !</font> </td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%"> <tr>` <td align="center"> <table cellpadding="0" cellspacing="0" border="0" width="auto"> <tr> <td bgcolor="" style="padding-top: 20px; padding-bottom:40px;"> <a href="'+data.url+'/event?email='+email+'" target="_blank" style="color:#FFFFFF; font-family:Arial, sans-serif; text-decoration:none; font-size:12px; padding-top: 18px; padding-bottom:18px; padding-left: 42px; padding-right:42px; border-radius:30px; background:#04e1af; display:block">SE CONNECTER POUR LA D&Eacute;COUVRIR</a> </td></tr></table> </td></tr></table> <table cellpadding="0" cellspacing="0" border="0" width="100%"> <tr> <td align="center" style="padding-left:20px; padding-right:20px; padding-bottom:40px;"> <font style="color:#FFFFFF; font-family:Arial, sans-serif; text-decoration:none; font-size:16px;"> REVEAL est l&rsquo;application qui vous permet de r&eacute;v&eacute;ler &agrave; vos amis un secret, un tournant de votre vie, une information que vous avez envie de partager uniquement les personnes qui vont sont le plus proches.<br/><br/>L&rsquo;annonce de '+data.name+' sera d&eacute;voil&eacute;e uniquement lorsque tous ses invit&eacute;s seront connect&eacute;s !<br/><br/><a href="/" style="color: #FFFFFF; text-decoration:underline; font-size:14px;">voir la version en ligne</a> </font> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> <table cellpadding="0" cellspacing="0" border="0" width="100%"> <tr> <td align="center" width="100%" height="1px" style="border-top: 1px solid #000; padding-bottom:40px;"> </td></tr></table><!--[if (gte mso 9)|(IE)]><table width="600" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td><![endif]--> <table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px;"> <tr> <td> <table cellpadding="0" cellspacing="0" border="0" align="center" width="auto"> <tr> <td align="center"> <img src="http://media.mnlk.org/newsletters/unveil/mail_fb.png" width="28" height="28"/> </td><td align="center"> <img src="http://media.mnlk.org/newsletters/unveil/mail_tw.png" width="28" height="28"/> </td></tr><tr> <td align="center" colspan="2" style="padding-top:20px; padding-bottom:40px;"> <font style="color:#FFFFFF; font-family:Arial, sans-serif; text-decoration:none; font-size:12px;">2016 © <a href="/" target="_blank" style="color:#FFFFFF;">unveil.com</a></font> </td></tr></table> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>'
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





