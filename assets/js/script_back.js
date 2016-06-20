var socket = io();
var emails = !sessionStorage.emails ? null : JSON.parse(sessionStorage.emails);
var url = window.location.search;
var user_email = url.substring(url.lastIndexOf('=')+1) || 0;
var clientId = '605751688227-u0fliiq32028oh6uim9mguae8hqfb7jj.apps.googleusercontent.com';
var apiKey = 'AIzaSyAOpIxefwOLJi7luSaFxNNSjNn7EjJWru0';
var scopes = 'https://www.googleapis.com/auth/contacts.readonly';

function display_contacts(){
	// Create list of contact
	$.each(emails, function(ind, val){
	    $('#contact_list').append('<li data-index='+ind+'><p>'+val.title+' <span class="user_mail">'+val.email+'</span></p></li>');
	});
}

function contact_management(){
	display_contacts();	

	var _tmp_invitations = [];

	// Select contacts
    $('#contact_list li').click(function(){
		var _invitations_emails = [];
		var _invitations = [];

        // Get index of each item
        var _tmp_id = parseInt($(this).attr('data-index'));
        // Add class selected
        $(this).toggleClass('selected');

        var _ind = parseInt(_tmp_invitations.indexOf(_tmp_id));
        if(_ind != -1) {
            _tmp_invitations.splice(_ind, 1);
            if(_tmp_invitations.length == 0){
                $('.steps li:nth-child(3)').removeClass('done');
                $(document).trigger('elDone');
            }
        } else {
            _tmp_invitations.push(_tmp_id);
            $('.steps li:nth-child(3)').addClass('done');
            $(document).trigger('elDone');
        }

        // Stock selected emails
        for(var i=0; i < _tmp_invitations.length; i++){
			_invitations.push(emails[_tmp_invitations[i]]);
		}
		$.each(_invitations, function(ind,val){
			_invitations_emails.push(val.email);
		});

		sessionStorage.invitations = JSON.stringify(_invitations_emails);

    });

} // contact_managemnt

function create_room(){

	// Create invitation
    $('#launch_room').click(function () {
		event.preventDefault();
		var d = $(this).serializeObject();
			d.attendees = JSON.parse(sessionStorage.invitations);
			d.url = window.location.protocol +'//'+ window.location.hostname +(':'+ window.location.port || '') ;
		socket.emit('create', d);
		socket.emit('post', d);

        sessionStorage.userEmail = d.name;
	});

    // Room created
	socket.on('created', function (d) {
		console.log(d);


	
		$('#usersOffline').empty();

        for(var i = 0; i <= d.attendees.length-1; i++){
        	$('#usersOffline').append('<li>'+d.attendees[i]+'</li>');
        }
    	$('#usersOffline').prepend('<li class="online">'+d.myself+'</li>');

		$('.slide_viewport').hide();
		$('#chat').show();
	});
} // create_room


function join_room(){
	// Hide form on load
	$('#login').hide();

	// Parse url
	(function($){
	    $.getQuery = function( query ) {
	        query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	        var expr = "[\\?&]"+query+"=([^&#]*)";
	        var regex = new RegExp( expr );
	        var results = regex.exec( window.location.href );
	        if( results !== null ) {
	            return results[1];
	            return decodeURIComponent(results[1].replace(/\+/g, " "));
	        } else {
	            return false;
	        }
	    };
	})(jQuery);

	// Display login form if email in parameter
	var _test_query = $.getQuery('email');
    if ( _test_query ) {
    	$('#login').show();
    	$('.slide_viewport').hide();
    	$('.steps').hide();
	}

	// LOGIN FOR USER WITH URL EMAIL PARAM
	$('#form_login').submit(function () {
        var d = $(this).serializeObject();
        d.email = user_email;

        sessionStorage.userEmail = d.name;

        socket.emit('join', d);

        event.preventDefault();
    });

	socket.on('joined', function (d) {

        if(d.success) {
        	$('#login').hide();
        	$('#chat').show();
        }
    });
}

function show_connected_users(){
	// CHECK ATTENDEES NUMBER
	socket.on('added', function (d) {
        console.log(d);
		$('#usersOffline').empty();

        for(var i = 0; i <= d.attendees.length-1; i++){
        	$('#usersOffline').append('<li>'+d.attendees[i]+'</li>');
        }
    	$('#usersOffline').prepend('<li class="online">'+d.myself+'</li>');
    });
}


function chat_management(){
	// Write msg
    $('#valid_msg').on('click', function(){
		send();
	});

    // Get msg
    function send(){
		var _m = {};
		_m.msg = $('#user_msg').val();
		_m.author = sessionStorage.userEmail;
		socket.emit('send', _m);

		// clear input
		$('#user_msg').val('');

        var _chatRoom = document.getElementById("conversation");
        _chatRoom.scrollTop = _chatRoom.scrollHeight;
	}

	// Keyboard 'enter' to valid msg
	document.addEventListener('keyup', function(e){
		if(e.keyCode === 13 && $('#user_msg').val() != '') send();
	});

	// Display msg
	socket.on('receive', function(msg){
		$('#conversation').append('<li><strong>'+msg.author+'</strong><br>'+msg.msg+'</li>');
	});
} // chat_management



function unveil_secret(){
	// UNVEIL
	socket.on('unveil', function (d) {
        console.log(d);
        $('#unveil').show().append(d.message);
    });
}


function serialize(){
	// Convert forms data into JSON
	$.fn.serializeObject = function(){
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
}



// Auth
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}
function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}
function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {

        authorizeButton.style.visibility = 'hidden';
        //console.log(authResult);

        getContacts(authResult.access_token);

    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

function getContacts(token){
    var url = 'https://www.google.com/m8/feeds/contacts/default/full/'
    + '?access_token='+token+'&alt=json&max-results=1000';

    $.get(url, function(data){
        console.log(data);

        var _tmp = [];

        //sessionStorage.setItem('emails', JSON.stringify(data.feed.entry));

        $.each(data.feed.entry, function(ind, val){
            if(val['gd$email']){
                _tmp.push({
                    title : val['title'].$t,
                    email : val['gd$email'][0].address
                });

                /*$('ul').append('<li><p>'+val['title'].$t+'<br>'+val['gd$email'][0].address+'</p></li>');*/
            }

            if(ind === data.feed.entry.length-1){
                sessionStorage.setItem('emails', JSON.stringify(_tmp));
                $('.steps li:first-child').addClass('done');
                $(document).trigger('elDone');
                $('.connected').fadeIn(100);

                /*        // DISPLAY THE LIST OF CONTACT
                $.each(_tmp, function(ind, val){
                    $('#contact_list').append('<li data-index='+ind+'><p>'+val.title+'<br>'+val.email+'</p></li>');
                });
                $.ajax({
                  url: 'assets/js/animated-search-filter.js',
                  dataType: "script",
                  success: success
                });*/
            }
            
            if(!sessionStorage.getContacts){
                sessionStorage.getContacts = true;
                window.location.reload(true);
            }
        });
    });
}

// Initalize
$(function(){

	$('#chat').hide();
	$('#unveil').hide();

	serialize();
	contact_management();
	chat_management();
	create_room();
	join_room();
	show_connected_users();
	unveil_secret();

});