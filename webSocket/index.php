<html>
	<head>
		<title>Chat With WebSocket</title>
        <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300italic,400italic,700italic,400,300,700&amp;subset=all' rel='stylesheet' type='text/css'>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link type="text/css" rel="stylesheet" href="../style.css">
		<?php // <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script> ?>
	</head>
	<body>
		<div id="wrapper">
			<h1>Chat With WebSocket</h1>
			<div id="content"></div>
			
			<p>
				<form id="sendMessge">
					<input type="text" name="name" id="name" class="name" value="" placeholder="Name:" disabled />
					<input type="text" name="message" id="message" value="" placeholder="Your message:" disabled />
					<button type="submit">Send</button>
				</form>
			</p>
		
			<p><a href="../">Back</a></p>
		</div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
		<script src="frontend.js"></script>
	</body>
</html>
