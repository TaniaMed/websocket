'use strict'

const chat = document.querySelector('.chat');

const messagesContent = chat.querySelector('.messages-content');

const chatStatus = chat.querySelector('.chat-status');
const statusOnline = chatStatus.getAttribute('data-online');
const statusOffline = chatStatus.getAttribute('data-offline');

const loading =  chat.querySelector('.loading');
const messageСompanion =  loading.nextElementSibling;
const сompanionText =  messageСompanion.querySelector('.message-text');
const companionTimestamp =  messageСompanion.querySelector('.timestamp');

const messageSpan =  chat.querySelector('.message-status span');
const messageStatus =  chat.querySelector('.message-status');
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.onopen = function() {
	chatStatus.innerHTML = statusOnline;
	messageSubmit.removeAttribute('disabled');
	messageSpan.innerHTML = 'Пользователь появился в сети';
	messagesContent.insertAdjacentHTML('beforeEnd', messageStatus.outerHTML);
	delStatus();

	connection.addEventListener('message', function(event) {
		let text = event.data;
		if (text === '...') {
			messagesContent.insertAdjacentHTML('beforeEnd', loading.outerHTML);
		} else {
			messagesContent.lastChild.outerHTML = '';
			сompanionText.innerHTML = text;
			let now = new Date();
			companionTimestamp.innerHTML = now.getHours() + ':' + now.getMinutes();
			messagesContent.insertAdjacentHTML('beforeEnd', messageСompanion.outerHTML);			
		}
	});
};

function delStatus() {
	setTimeout(function() {
		const status = messagesContent.querySelector('.message-status');
		console.log(messagesContent);
		status.outerHTML = '';
	}, 5000);
	return;
}

connection.onclose = function() {
	chatStatus.innerHTML = statusOffline;
	messageSubmit.setAttribute('disabled', 'disabled');
	messageSpan.innerHTML = 'Пользователь не в сети';
	messagesContent.insertAdjacentHTML('beforeEnd', messageStatus.outerHTML);
	delStatus();
};

const messageSubmit = chat.querySelector('.message-submit');
const messageInput = chat.querySelector('.message-input');

const messagePersonal =  chat.querySelector('.message-personal');
const messageText =  messagePersonal.querySelector('.message-text');
const timestamp =  messagePersonal.querySelector('.timestamp');

messageSubmit.addEventListener('click', function(event) {
	connection.send(JSON.stringify({message : messageInput.text}));
	messageText.innerHTML =  messageInput.text;
	let now = new Date();
	timestamp.innerHTML = now.getHours() + ':' + now.getMinutes();
	messagesContent.insertAdjacentHTML('beforeEnd', messagePersonal.outerHTML);
});
