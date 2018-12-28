var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');


// jQuery references
var divUsers = $('#divUsers');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

// Functions to render users
function renderUsers(people) {

    console.log(people);

    var html = '';

    html += '<li><a href="javascript:void(0)" class="active"> Chat <span> ' + params.get('room') + '</span></a></li>';

    for (var i = 0; i < people.length; i++) {

        html += ' <li>  <a data-id="' + people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + people[i].name + ' <small class="text-success">online</small></span></a></li>';
    }
    divUsers.html(html);
}

function renderMessages(message) {

    var html = '';

    html += '    <li class="animated fadeIn">';
    html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '    <div class="chat-content">';
    html += '        <h5>' + message.name + '</h5>';
    html += '        <div class="box bg-light-info">' + message.message + '</div>';
    html += '    </div>';
    html += '    <div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChatbox.append(html);
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
        renderMessages(message);
    });
});