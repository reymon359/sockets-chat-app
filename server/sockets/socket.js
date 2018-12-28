const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();


// To know when an user (client) connects to the server
io.on('connection', (client) => {
    client.on('enterChat', (data, callback) => {
        // If there is no name we return the callback
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'Name or room are required'
            });
        }


        // Connection the user to a room
        client.join(data.room);

        users.addPerson(client.id, data.name, data.room);
        client.broadcast.to(data.room).emit('peopleList', users.getPeopleFromRoom(data.room));
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${data.name} joined`));

        // We return the people connected to the chat
        callback(users.getPeopleFromRoom(data.room));
    });

    // When a person creates a message to the chat
    client.on('createMessage', (data, callback) => {
        // First we get all the person data
        let person = users.getPerson(client.id);

        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);

        callback(message);
    });

    // To know when the user/person disconnects
    client.on('disconnect', () => {
        let personDeleted = users.deletePerson(client.id);
        client.broadcast.to(personDeleted.room).emit('createMessage', createMessage('Admin', `${personDeleted.name} left`));
        client.broadcast.to(personDeleted.room).emit('peopleList', users.getPeopleFromRoom(personDeleted.room));

    });

    // Private messages
    client.on('privateMessage', data => {
        if (data.message !== '' && data.to !== '') {
            let person = users.getPerson(client.id);
            client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));

        }
    });
});