var socket = io(); // Using var for browser compatibility
// The .on are to listen and .emit to send
// To know when its connected to the server
socket.on('connect', function() {
    console.log('Connected to the server');
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