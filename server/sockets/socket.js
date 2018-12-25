const { io } = require('../server');


// To know when an user (client) connects to the server
io.on('connection', (client) => {
    console.log('User connected');
    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Wellcome to this app'
    });
    // To know if the client disconnects from the server
    client.on('disconnect', () => {
        console.log('User disconnected');
    });
    // Listening the client
    client.on('sendMessage', (data, callback) => {
        console.log(data);
        // To emit the info to everyone we use broadcast
        client.broadcast.emit('sendMessage', data);
        // if (message.user) {
        //     callback({
        //         resp: 'Good!'
        //     });
        // } else {
        //     callback({
        //         resp: 'Bad!'
        //     });
        // }
    });

});