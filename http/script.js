function Chat() {
	this.timestamp = 0;
	this.hasNoError = true;
	this.url = './server.php';
    
	if (typeof Chat.prototype.connect != "function") {
        Chat.prototype.connect = function() {
			var self = this;
			$.ajax({
				url: self.url,
				type: 'GET',
				data: {timestamp: self.timestamp},
				success: function(transport){
					var response = $.parseJSON(transport);
					self.timestamp = response['timestamp'];
					$('#content').append('<div>' + response['msg'] + '</div>');
					var objDiv = document.getElementById("content");
					objDiv.scrollTop = objDiv.scrollHeight;
					self.hasNoError = true;
				},
				error: function() {
					self.hasNoError = false;
				},
				complete: function(){
					if (!self.hasNoError)
						setTimeout(function(){ self.connect() }, 8000); 
					else self.connect();
				},
			});
        };
        Chat.prototype.send = function(message,onSuccess,onError) {
			$.ajax({
				url: this.url,
				type: 'GET',
				data: {msg: message},
				success: onSuccess,
				error: onError
			});
        };
	}
}

var chat = new Chat();
chat.connect();

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
		chat.send(
			$('#name').val() +': '+ $('#message').val(),
			function() {
				$('#message').val('');
				$('#sendMessge').removeClass('sending')
				$('#sendMessge button[type=submit]').html('Send');
			},
			function() {
				alert('error');
				$('#sendMessge').removeClass('sending')
				$('#sendMessge button[type=submit]').html('Send');
			}
		);
		return false;
	});
});
