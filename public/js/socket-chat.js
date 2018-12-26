var socket = io(); // Using var for browser compatibility

var params = new URLSearchParams(window.location.search);
if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('The name is required');
}

var user = {
    name: params.get('name')
};

socket.on('connect', function() {
    console.log('Connected to the server');
    socket.emit('enterChat', user, function(resp) {
        console.log('Users connected', resp);
    });
});
// To know when the server connection is lost
socket.on('disconnect', function() {
    console.log('Connection with the server lost');
});
// Send info to the server
socket.emit('sendMessage', {
    user: 'Ramon',
    message: 'Hello world'
}, function(resp) {
    console.log('Server response: ', resp);
});
// Listen info from server
socket.on('sendMessage', function(message) {
    console.log('Server: ', message);
});