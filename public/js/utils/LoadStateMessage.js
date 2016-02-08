window.loadStateId = window.loadStateId || 'loading-state';
window.loadStateObject = document.getElementById(window.loadStateId);

var lastState = {
	message: '',
	status: ''
};

function loadLastState() {
	if (!window.loadStateObject) return false;
	
	lastState.message = window.loadStateObject.innerHTML;
	lastState.status = window.loadStateObject.style.display;
}

function restoreLastState(forceDisplay) {
	var forceDisplay = forceDisplay || false;

	var message = lastState.message;
	var display = lastState.status;
	if (forceDisplay) display = 'block';

	setState(message, display);
}

function setState(message, display) {
	message = message || '';
	display = display || 'block';

	if (!message.length) display = 'none';

	window.loadStateObject.innerHTML = message;
	window.loadStateObject.style.display = display;
}

module.exports = {
	loadLastState: loadLastState,
	restoreLastState: restoreLastState,
	setState: setState
}