const { io } = require('../server');
const { Users } = require('../classes/users');

const users = new Users();


// To know when an user (client) connects to the server
io.on('connection', (client) => {
    client.on('enterChat', (data, callback) => {
        // If there is no name we return the callback
        if (!data.name) {
            return callback({
                error: true,
                message: 'The name is required'
            });
        }
        // I emit a message when an person connects to the chat
        client.broadcast.emit('createMessage', { user: 'Admin', message: `${data.name} entered the chat` });

        let people = users.addPerson(client.id, data.name);
        client.broadcast.emit('peopleList', users.getPeople());
        // We return the people connected to the chat
        return callback(people);
    });
    // To know when the user/person disconnects
    client.on('disconnect', () => {
        let personDeleted = users.deletePerson(client.id);
        client.broadcast.emit('createMessage', { user: 'Admin', message: `${personDeleted.name} left the chat` });
        client.broadcast.emit('peopleList', users.getPeople());

    });
});