var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');


// jQuery references
var divUsers = $('#divUsers');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');
var chatTitle = $('#chatTitle');

function renderChatTitle() {
    var html = '';
    html += '<h3 class="box-title">Chat room <small>' + params.get('room') + '</small></h3>';
    chatTitle.html(html);
}


// Functions to render users
function renderUsers(people) {

    var html = '';

    html += '<li><a href="javascript:void(0)" class="active"> Chat <span> ' + params.get('room') + '</span></a></li>';

    for (var i = 0; i < people.length; i++) {

        html += ' <li>  <a data-id="' + people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + people[i].name + ' <small class="text-success">online</small></span></a></li>';
    }
    divUsers.html(html);
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
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li> ';
    } else {
        html += '<li class="animated fadeIn ' + textAlign + '">';
        if (message.name !== 'Admin') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
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