'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

const counterCon = document.querySelector('.counter');
const counterErr = document.querySelector('output.errors');

connection.addEventListener('open', () => {
	connection.addEventListener('message', event => {
		let message = JSON.parse(event.data);
		counterCon.innerHTML = message.connections;
		counterErr.innerHTML = message.errors;
	});
});

window.addEventListener('beforeunload', () => {
	connection.onclose = () => {
		connection.close(1000, 'Работа закончена');
	}
});