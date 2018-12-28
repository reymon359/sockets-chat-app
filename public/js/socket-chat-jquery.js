var params = new URLSearchParams(window.location.search);

// jQuery references
var divUsers = $('#divUsers');

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