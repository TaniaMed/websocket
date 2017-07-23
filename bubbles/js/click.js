'use strinct';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', function() {
	showBubbles(connection);
	document.addEventListener('click', event => {
		connection.send(JSON.stringify({
				x: event.offsetX,
				y: event.offsetY
			})
		)
	});	
});