var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');

let usersNumber = 0;

// jQuery references
var divUsers = $('#divUsers');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');
var chatTitle = $('#chatTitle');

function renderChatTitle() {
    var html = '';
    html += `<h3 class="box-title">Chat room <small>${params.get('room')}</small> &nbsp;&nbsp;&nbsp; <span> Users: <small>${usersNumber}</small></span> &nbsp;&nbsp;&nbsp;<a href="https://www.addtoany.com/share_save?linkurl=https://${window.location.hostname}/index.html?room=${params.get('room')}" class="btn btn-link btn-rounded bg-dark text-light" type="submit" target="_blank">Share room</a></h3>`;
    chatTitle.html(html);
}


// Functions to render users
function renderUsers(people) {
    usersNumber = people.length;

    var html = '';

    html += '<li><a href="javascript:void(0)" > <span> Users</span></a></li>';

    for (var i = 0; i < people.length; i++) {
        if (people[i].name === params.get('name')) {

            html += ' <li>  <a data-id="' + people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.png" alt="user-img" class="img-circle"> <span>' + people[i].name + ' <small class="text-success">online</small></span></a></li>';
        } else {

            html += ' <li>  <a data-id="' + people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/2.png" alt="user-img" class="img-circle"> <span>' + people[i].name + ' <small class="text-success">online</small></span></a></li>';
        }
    }
    divUsers.html(html);
    renderChatTitle(); // For the users number
}

function renderMessages(message, me) {

    var html = '';
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';
    var textAlign = '';
    if (message.name === 'Admin') {
        adminClass = 'warning';
        textAlign = 'text-center';
    }

    if (me) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + message.name + '</h5>';
        html += '        <div class="box bg-light-inverse">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/1.png" alt="user" /></div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li> ';
    } else {
        html += '<li class="animated fadeIn ' + textAlign + '">';
        if (message.name !== 'Admin') {
            html += '    <div class="chat-img"><img src="assets/images/users/2.png" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        if (message.name !== 'Admin') {
            html += '        <h5>' + message.name + '</h5>';
        }
        html += '        <div class="box bg-light-' + adminClass + '">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsers.on('click', 'a', function() {
    // The this makes reference to the ancle-tag element that was clicked
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

sendForm.on('submit', function(e) {

    e.preventDefault();

    // .trim() removes the empty spaces before and after
    if (txtMessage.val().trim().length === 0) {
        return
    }
    socket.emit('createMessage', {
        name: name,
        message: txtMessage.val()
    }, function(message) {
        txtMessage.val('').focus();
        renderMessages(message, true);
        scrollBottom();
    });
});