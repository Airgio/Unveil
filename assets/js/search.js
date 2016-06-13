$(function(){
	//var emails = !sessionStorage.emails ? null : JSON.parse(sessionStorage.emails);
	var availableTags = emails;
	console.log(availableTags);
	$( "#tags" ).autocomplete({
      source: availableTags
    });
});