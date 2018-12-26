const { io } = require('../server');
const { Users } = require('../classes/users');

const users = new Users();


// To know when an user (client) connects to the server
io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        // If the is no name we return the callback
        if (!data.name) {
            return callback({
                error: true,
                message: 'The name is required'
            });
        }
        let people = users.addPerson(client.id, data.name);
        // We return the people connected to the chat
        return callback(people);
    });
});