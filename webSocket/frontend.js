$(function () {
    "use strict";


    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
		$('#content').append('<div>Sorry, but your browser doesn\'t support WebSockets.</div>');
		var objDiv = document.getElementById("content");
		objDiv.scrollTop = objDiv.scrollHeight;
        $('#sendMessge').hide();
        return;
    }

    // open connection
    var connection = new WebSocket('ws://5.100.253.198:1337');

    connection.onopen = function () {
        // first we want users to enter their names
		console.log('connection.onopen');
        $('#sendMessge input').removeAttr('disabled').val('');
        $('#sendMessge .name').focus();
    };

    connection.onerror = function (error) {
		console.log('connection.onerror');
        // just in there were some problems with conenction...
		$('#content').append('<div>Sorry, but there\'s some problem with your connection or the server is down.</div>');
		var objDiv = document.getElementById("content");
		objDiv.scrollTop = objDiv.scrollHeight;
        // $('#sendMessge').hide();
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
        console.log('connection.onmessage');
        console.log(message);
		// try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'history') { // entire message history
            // insert every single message to the chat window
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].text,new Date(json.data[i].time));
            }
        } else if (json.type === 'message') { // it's a single message
            $('#sendMessge input').removeAttr('disabled'); // let the user write another message
			$('#sendMessge').removeClass('sending')
			$('#sendMessge button[type=submit]').html('Send');
			addMessage(json.data.text, new Date(json.data.time));
			$('#message').focus();
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };

    /**
     * Send mesage when user presses Enter key
     */
	 jQuery(document).ready(function($) {
		$('#sendMessge').submit(function() {
			if ($('#sendMessge').hasClass('sending'))
				return false;
			if ($('#name').val() == '') {
				alert('Please fill your name');
				return false;
			}
			if ($('#message').val() == '') {
				alert('Please fill your message');
				return false;
			}
			$('#sendMessge').addClass('sending')
			$('#sendMessge button[type=submit]').html('Sending');
			
			// send the message as an ordinary text
			connection.send($('#name').val() +': '+ $('#message').val());
			$('#message').val('').focus();
			// $('#message').val('');
			// disable the input field to make the user wait until server
			// sends back response
			$('#message').attr('disabled', 'disabled');
			return false;
		});
	});
    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function() {
        if (connection.readyState !== 1) {
            $('#message').attr('disabled', 'disabled').val('Unable to comminucate with the WebSocket server.');
        }
    }, 5000);

    /**
     * Add message to the chat window
     */
    function addMessage(message, datetime) {
		$('#content').append('<div>' + message + '</div>');
		var objDiv = document.getElementById("content");
		objDiv.scrollTop = objDiv.scrollHeight;
    }
    
    
});
