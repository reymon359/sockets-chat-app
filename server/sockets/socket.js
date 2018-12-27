const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

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
        client.broadcast.emit('createMessage', createMessage('Admin', `${data.name} entered`));

        let people = users.addPerson(client.id, data.name);
        client.broadcast.emit('peopleList', users.getPeople());
        // We return the people connected to the chat
        return callback(people);
    });

    // When a person creates a message to the chat
    client.on('createMessage', (data) => {
        // First we get all the person data
        let person = users.getPerson(client.id);

        let message = createMessage(person.name, data.message);
        client.broadcast.emit('createMessage', message);
    });

    // To know when the user/person disconnects
    client.on('disconnect', () => {
        let personDeleted = users.deletePerson(client.id);
        client.broadcast.emit('createMessage', createMessage('Admin', `${personDeleted.name} left`));
        client.broadcast.emit('peopleList', users.getPeople());

    });
});