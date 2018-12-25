class Users {
    // Initializes a people array that will be connected to a chat
    constructor() {
        this.people = [];
    }
    addPerson(id, name) {
        let person = { id, name };
        this.people.push(person);
        return this.people;
    }

    getPerson(id) {
        let person = this.people.filter(person => person.id === id)[0];
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeopleFromRoom(room) {

    }

    deletePerson(id) {
        let personDeleted = this.getPerson(id);
        this.people = this.people.filter(person => person.id != id);
        return personDeleted;
    }
}

module.exports = {
    Users
}